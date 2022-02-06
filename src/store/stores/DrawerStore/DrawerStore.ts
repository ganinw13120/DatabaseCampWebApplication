import { v4 as uuidv4 } from "uuid";
import {
  ActionType,
  Box,
  BoxDetail,
  Entity,
  Line,
  LineInfo,
  LineInfoBox,
  LineType,
  Point,
  Position,
} from "@model/Drawer";
import generateBox from "@root/view/activity/components/drawer/utils/generateBox";
import { makeObservable, observable, action } from "mobx";
import React from "react";

import RootStore from "../../RootStore";

import IDrawerStore, { Store } from "./IDrawerStore";
import addPositionOffset from "@root/view/activity/components/drawer/utils/addPositionOffset";
import parseClientRectsToPosition from "@root/view/activity/components/drawer/utils/parseClientRectsToPosition";

const pointOffset: number = 15;

export class DrawerStore implements IDrawerStore {
  rootStore: RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);

    this.store.boxes = [
      generateBox("Record", [
        "record_id",
        "room_id",
        "guest_id",
        "created_at",
        "updated_at",
      ]),
      generateBox("Record", [
        "record_id",
        "room_id",
        "guest_id",
        "created_at",
        "updated_at",
      ]),
    ];
  }

  @observable
  store: Store = {
    currentPosition: { x: 0, y: 0 },
    lastPosition: { x: 0, y: 0 },
    boxes: [],
    lines: [],
    focusEntity: null,
    actionType: ActionType.None,
    containerRef: React.createRef<HTMLDivElement>(),
    svgRef: React.createRef<SVGSVGElement>(),
  };

  public getDrawerOffset(): Position {
    return {
      x: this.store.containerRef.current
        ? this.store.containerRef.current!.getClientRects()[0].x
        : 0,
      y: this.store.containerRef.current
        ? this.store.containerRef.current!.getClientRects()[0].y
        : 0,
    };
  }

  public getSvgOffset(): Position {
    return {
      x: this.store.svgRef.current
        ? this.store.svgRef.current!.getClientRects()[0].x
        : 0,
      y: this.store.svgRef.current
        ? this.store.svgRef.current!.getClientRects()[0].y
        : 0,
    };
  }

  @action.bound
  public clearSelection(): void {
    this.store.focusEntity = null;
  }

  @action.bound
  private getCurrentAction(): ActionType {
    let isFocusing,
      isDragging,
      isDrawingReady = false;
    let _focusEntity: Entity | null = null;
    this.store.boxes.forEach((e) => {
      if (e.isDragging) isDragging = true;
      if (e.isHover) {
        isFocusing = true;
        _focusEntity = e;
      }
      if (e.points.some((_e) => _e.isHover)) {
        _focusEntity = e.points.find((_e) => _e.isHover)!;
        isDrawingReady = true;
      }
    });
    this.store.focusEntity = _focusEntity;
    if (isDrawingReady) {
      return ActionType.DrawReady;
    } else if (isDragging) {
      return ActionType.Drag;
    } else if (isFocusing) {
      return ActionType.Focus;
    } else {
      return ActionType.None;
    }
  }

  @action.bound
  public setCurrentMousePosition(newPosition: Position): void {
    this.store.currentPosition = newPosition;
  }

  @action.bound
  private startDrawing(): void {
    const { focusEntity } = this.store;
    if (!focusEntity || !this.isPoint(focusEntity)) {
      console.log("Something went wrong on dragging, abort!");
      return;
    }
    const target = focusEntity as Point;
    const targetBox = this.store.boxes.find((e) =>
      e.points.some((e) => e.isHover)
    );
    if (!targetBox) {
      console.log("Target box not found, unable to satrt drawing!");
      return;
    }
    let tmp = this.store.lines;

    const startInfo = {
      box: {
        box: targetBox,
        level: target.level,
        pointPosition: target.position,
      },
    };

    tmp.push({
      uuid: uuidv4(),
      startType: LineType.OnlyOne,
      stopType: LineType.More,
      startInfo: startInfo,
      stopInfo: {
        position: this.store.currentPosition,
      },
      isFocus: true,
      startPosition: this.calculatePositionFromInfomation(startInfo),
      stopPosition: this.store.currentPosition,
    });
    this.store.actionType = ActionType.Draw;
  }

  private calculatePositionFromInfomation(data: LineInfo): Position {
    return data.box
      ? parseClientRectsToPosition(
          this.getPointFromInfo(data.box!)!.ref.current!.getClientRects()[0],
          pointOffset,
          this.getSvgOffset()
        )
      : data.position!;
  }

  @action.bound
  private stopDrawing(): void {
    const currentAction = this.getCurrentAction();
    console.log(currentAction)

    let tmp = [...this.store.lines];

    if (currentAction === ActionType.DrawReady) {
      const { focusEntity } = this.store;
      if (!focusEntity || !this.isPoint(focusEntity)) {
        console.log("Something went wrong on dragging, abort!");
        return;
      }
      const target = focusEntity as Point;
      const targetBox = this.store.boxes.find((e) =>
        e.points.some((e) => e.isHover)
      );
      if (!targetBox) {
        console.log('Focusing box is not found, abort!');
        return;
      }
      const stopInfo : LineInfo = {
        box : {
          box : targetBox,
          level : target.level,
          pointPosition : target.position
        }
      };
      tmp.find(e=>e.isFocus)!.stopInfo = stopInfo;
      tmp.find(e=>e.isFocus)!.stopPosition = this.calculatePositionFromInfomation(stopInfo);
    }

    tmp = tmp.map((e) => {
      e.isFocus = false;
      return e;
    });
    this.store.lines = tmp;
    this.store.actionType = ActionType.None;
  }

  @action.bound
  private drawEntity(): void {
    const focusLine = this.store.lines.find((e) => e.isFocus);
    if (!focusLine) return;
    let tmp = [...this.store.lines];
    tmp.find((e) => e.isFocus)!.stopInfo.position = this.store.currentPosition;
    tmp.find((e) => e.isFocus)!.stopPosition = this.store.currentPosition;
  }

  @action.bound
  public deleteEntity(): void {}

  @action.bound
  public addRelation(): void {}

  @action.bound
  public changeFields(amount: number): void {}

  @action.bound
  public addField(type: "Buttom" | "Top", focusBox?: Box): void {}

  private isBox(target: Entity): boolean {
    return (target as Box).entities !== undefined;
  }
  private isLine(target: Entity): boolean {
    return (target as Line).startType !== undefined;
  }
  private isPoint(target: Entity): boolean {
    return (target as Point).position !== undefined;
  }

  @action.bound
  public getFocusBox(): Box | null {
    if (this.store.focusEntity && this.isBox(this.store.focusEntity)) {
      return this.store.focusEntity as Box;
    } else {
      return null;
    }
  }

  @action.bound
  public getFocusLine(): Line | null {
    if (this.store.focusEntity && this.isLine(this.store.focusEntity)) {
      return this.store.focusEntity as Line;
    } else {
      return null;
    }
  }

  @action.bound
  public handleMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const { svgRef } = this.store;
    let current: Position = {
      x: e.clientX - svgRef.current!.getClientRects()[0].left,
      y: e.clientY - svgRef.current!.getClientRects()[0].top,
    };
    this.setCurrentMousePosition(current);
    const { actionType } = this.store;
    if (actionType === ActionType.Drag) {
      this.dragEntity();
      this.reCalculatePosition();
    } else if (actionType === ActionType.Draw) {
      this.drawEntity();
    }
  }

  @action.bound
  private reCalculatePosition () : void {
    let tmp = [...this.store.lines];
    tmp.forEach(e=>{
      e.startPosition = this.calculatePositionFromInfomation(e.startInfo);
      e.stopPosition = this.calculatePositionFromInfomation(e.stopInfo);
    })
    this.store.lines = tmp;
  }

  @action.bound
  public handleMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (this.store.actionType === ActionType.Draw) {
      this.stopDrawing();
    } else if (this.store.actionType === ActionType.Drag) {
      this.store.actionType = ActionType.None;
    }
  }

  @action.bound
  public handleMouseDown(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const currentAction = this.getCurrentAction();
    this.store.actionType = currentAction;
    if (currentAction === ActionType.DrawReady) {
      this.startDrawing();
    } else if (currentAction === ActionType.Focus) {
      this.startDragging();
    }
  }

  @action.bound
  private startDragging(): void {
    this.store.lastPosition = this.store.currentPosition;
    this.store.actionType = ActionType.Drag;
  }

  @action.bound
  private dragEntity(): void {
    const { focusEntity } = this.store;
    if (!focusEntity || !this.isBox(focusEntity)) {
      console.log("Something went wrong on dragging, abort!");
      return;
    }

    const target = focusEntity as Box;
    const { currentPosition, lastPosition } = this.store;
    const newPos: Position = {
      x: target.pos.x + (currentPosition.x - lastPosition.x),
      y: target.pos.y + (currentPosition.y - lastPosition.y),
    };
    this.store.lastPosition = currentPosition;
    this.store.boxes.find((e) => e.uuid === focusEntity.uuid)!.pos = newPos;
  }

  @action.bound
  public onBackgroundClick(): void {
    this.clearSelection();
  }

  @action.bound
  public addBoxPoints(box: Box, points: Point[]): void {
    this.store.boxes.find((e) => e.uuid === box.uuid)!.points = points;
  }

  @action.bound
  public onEntityUpdate(box: Box, entity: BoxDetail): void {
    this.store.boxes = this.store.boxes.map((e) => {
      if (e.uuid === box.uuid) {
        e.entities = e.entities.map((_e) => {
          if (_e.uuid === entity.uuid) {
            _e = entity;
          }
          return _e;
        });
      }
      return e;
    });
  }

  @action.bound
  public onPointUpdate(point: Point): void {}

  @action.bound
  public getPointFromInfo(info: LineInfoBox): Point {
    return info.box.points.find(
      (e) => e.level === info.level && e.position === info.pointPosition
    )!;
  }

  @action.bound
  public onHoverBox(box: Box): void {
    let tmp = this.store.boxes;
    tmp.find((e) => e.uuid === box.uuid)!.isHover = true;
    this.store.boxes = tmp;
  }

  @action.bound
  public onUnHoverBox(box: Box): void {
    this.store.boxes.find((e) => e.uuid === box.uuid)!.isHover = false;
  }
}
