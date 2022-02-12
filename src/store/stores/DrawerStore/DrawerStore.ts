import { v4 as uuidv4 } from "uuid";
import {
  ActionType,
  Box,
  BoxDetail,
  Entity,
  KeyType,
  Line,
  LineInfo,
  LineInfoBox,
  LineType,
  Point,
  PointPosition,
  Position,
} from "@model/Drawer";
import generateBox from "@root/view/activity/components/drawer/utils/generateBox";
import { makeObservable, observable, action, keys } from "mobx";
import React from "react";

import RootStore from "../../RootStore";

import IDrawerStore, { Store } from "./IDrawerStore";
import parseClientRectsToPosition from "@root/view/activity/components/drawer/utils/parseClientRectsToPosition";
import { DrawerAnswer, DrawerChoice, DrawerRelationshipAnswer, DrawerTableAnswerDetail, RelationShipType } from "@root/model/Learning";

const pointOffset: number = 15;

export class DrawerStore implements IDrawerStore {
  rootStore: RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);

    this.store.boxes = [
      generateBox([
        "Record",
        "record_id",
        "room_id",
        "guest_id",
        "created_at",
        "updated_at",
      ]),
      generateBox([
        "Record",
        "record_id",
        "room_id",
        "guest_id",
        "created_at",
        "updated_at",
      ]),
    ];
  }

  isEditable : boolean = true;

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

  private parseRelationshipTypeToLineType (target : RelationShipType) : {start : LineType, stop : LineType} {
    if (target==='MANY_TO_MANY') {
      return {
        start : LineType.More,
        stop : LineType.More,
      }
    } else if (target==='ONE_TO_MANY') {
      return {
        start : LineType.OnlyOne,
        stop : LineType.More,
      }
    } else {
      return {
        start : LineType.OnlyOne,
        stop : LineType.OnlyOne,
      }
    }
  }

  @action.bound
  public setupDrawer(info : DrawerChoice, isEditable : boolean) : void {
    let boxes : Box[] = [];
    info.tables.forEach((e, key)=>{
      boxes.push(generateBox([
        e.title ? e.title : '', ...e.attributes.map(e=>e.value)
      ], e.table_id, {x : (key * 150) + 20, y : key * 100}, true))
    })
    this.store.boxes = boxes;
    this.isEditable = isEditable;
  }

  @action.bound
  public setupLine (info : DrawerChoice) : void {
    const boxes = this.store.boxes;
    let lines : Line[] = [];
    if (info.relationships) info.relationships.forEach(e=>{
      const lineType = this.parseRelationshipTypeToLineType(e.relationship_type);
      const startBox = boxes.find(_e=>_e.uuid===e.table1_id)!;
      const stopBox =  boxes.find(_e=>_e.uuid===e.table2_id)!;
      if( startBox && stopBox)lines.push({
        uuid :uuidv4(),
        startType : lineType.start,
        stopType : lineType.stop,
        startInfo : {
          box : {
            box : startBox,
            level : 0,
            pointPosition : PointPosition.Right
          }
        },
        stopInfo : {
          box : {
            box : stopBox,
            level : 0,
            pointPosition : PointPosition.Left
          }
        },
        isSelect : false,
        startPosition : startBox.pos,
        stopPosition : stopBox.pos
      })
    })
    this.store.lines = lines;
  }

  private getRelationshipType (startType : LineType, stopType : LineType) : RelationShipType {
    if (startType !== stopType) {
      return "ONE_TO_MANY";
    } else if (startType===LineType.More) {
      return "MANY_TO_MANY";
    } else {
      return "ONE_TO_ONE";
    }
  }

  private getKeyType (target : KeyType) : "PK" | "FK" | null {
    if (target===KeyType.Foreign) return 'FK'
    else if (target===KeyType.Primary) return 'PK'
    else return null
  }

  @action.bound
  public getDrawerAnswer() : DrawerAnswer {
    const table : DrawerTableAnswerDetail[] = [];
    this.store.boxes.forEach(e=>{
      table.push({
        table_id : e.uuid,
        title : e.entities[0].text,
        attributes : e.entities.slice(1).map(e=>{return {value: e.text, key : this.getKeyType(e.keyType)}})
      })
    })
    const relationship : DrawerRelationshipAnswer[] = [];
    this.store.lines.forEach(e=>{
      relationship.push({
        table1_id : e.startInfo.box!.box.uuid,
        table2_id : e.stopInfo.box!.box.uuid,
        relationship_type : this.getRelationshipType(e.startType, e.stopType)
      })
    })
    let ans : DrawerAnswer = {
      tables : table,
      relationships : relationship
    }
    return ans;
  }

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
    this.clearSelectionBoxes();
    this.clearSelectionLine();
  }

  @action.bound
  private clearSelectionBoxes(): void {
    this.store.boxes = this.store.boxes.map((e) => {
      e.isHover = false;
      e.isSelect = false;
      e.isDragging = false;
      return e;
    });
  }

  @action.bound
  private clearSelectionLine(): void {
    this.store.lines = this.store.lines.map((e) => {
      e.isSelect = false;
      return e;
    });
  }

  @action.bound
  private getCurrentAction(): ActionType {
    let isFocusing = false,
      isDragging = false,
      isDrawingReady = false;
    let _focusEntity: Entity | null = null;
    this.store.boxes.forEach((e) => {
      if (e.isDragging) isDragging = true;
      if (e.isSelect && !isFocusing) {
        isFocusing = true;
        _focusEntity = e;
      }
      if (e.isHover) {
        isFocusing = true;
        _focusEntity = e;
      }
      if (e.points.some((_e) => _e.isHover)) {
        _focusEntity = e.points.find((_e) => _e.isHover)!;
        isDrawingReady = true;
      }
    });
    if (!_focusEntity) {
      this.store.lines.forEach((e) => {
        if (e.isSelect) {
          _focusEntity = e;
        }
      });
    }
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
      isSelect: true,
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
        console.log("Focusing box is not found, abort!");
        return;
      }
      const stopInfo: LineInfo = {
        box: {
          box: targetBox,
          level: target.level,
          pointPosition: target.position,
        },
      };
      tmp.find((e) => e.isSelect)!.stopInfo = stopInfo;
      tmp.find((e) => e.isSelect)!.stopPosition =
        this.calculatePositionFromInfomation(stopInfo);
    }

    const focusLine = tmp.find((e) => e.isSelect)!;
    if (
      (
        focusLine.startInfo.box &&
        focusLine.stopInfo.box &&
        this.isSamePoint(focusLine.startInfo.box, focusLine.stopInfo.box)
      ) || (
        !focusLine.stopInfo.box
      )
    ) {
      tmp = tmp.filter((e) => !e.isSelect);
    }

    tmp = tmp.map((e) => {
      e.isSelect = false;
      return e;
    });

    this.store.lines = tmp;
    this.store.focusEntity = null;
    this.store.actionType = ActionType.None;
  }

  private isSamePoint(a: LineInfoBox, b: LineInfoBox): boolean {
    return (
      a.box.uuid === b.box.uuid &&
      a.level === b.level &&
      a.pointPosition === b.pointPosition
    );
  }

  @action.bound
  private drawEntity(): void {
    const focusLine = this.store.lines.find((e) => e.isSelect);
    if (!focusLine) return;
    let tmp = [...this.store.lines];
    tmp.find((e) => e.isSelect)!.stopInfo.position = this.store.currentPosition;
    tmp.find((e) => e.isSelect)!.stopPosition = this.store.currentPosition;
  }

  @action.bound
  public deleteEntity(): void {
    const { focusEntity } = this.store;
    if (!focusEntity) return;
    if (this.isBox(focusEntity)) {
      this.store.lines = this.store.lines.filter((e) => {
        return !(
          e.startInfo.box?.box.uuid === focusEntity.uuid ||
          e.stopInfo.box?.box.uuid === focusEntity.uuid
        );
      });
      this.store.boxes = this.store.boxes.filter(
        (e) => !(e.uuid === focusEntity.uuid)
      );
    } else if (this.isLine(focusEntity)) {
      this.store.lines = this.store.lines.filter(
        (e) => !(e.uuid === focusEntity.uuid)
      );
    }
    const currentAction = this.getCurrentAction();
    this.store.actionType = currentAction;
  }

  @action.bound
  public addRelation(): void {
    const newBox = generateBox([""]);
    const tmp = [...this.store.boxes];
    tmp.push(newBox);
    this.store.boxes = tmp;
    const currentAction = this.getCurrentAction();
    this.store.actionType = currentAction;
  }

  @action.bound
  public changeFields(amount: number): void {
    const { focusEntity } = this.store;
    const target = focusEntity as Box;
    if (!focusEntity || !this.isBox(focusEntity)) {
      return;
    }
    if (target.entities.length > amount) {
      if (target.entities.length <= 1) {
        return;
      }
      this.removeField();
    } else {
      this.addField("Buttom");
    }
  }

  @action.bound
  public removeField(): void {
    const { focusEntity } = this.store;
    const target = focusEntity as Box;
    if (!focusEntity || !this.isBox(focusEntity)) {
      return;
    }
    target.entities.pop();
    this.generatePoint(target);
  }

  @action.bound
  public addField(type: "Buttom" | "Top"): void {
    const { focusEntity } = this.store;
    const target = focusEntity as Box;
    if (!focusEntity || !this.isBox(focusEntity)) {
      return;
    }
    const refEntity = React.createRef<HTMLDivElement>();
    switch (type) {
      case "Buttom":
        target.entities.push({
          uuid: uuidv4(),
          text: "",
          ref: refEntity,
          isFocus: false,
          keyType: KeyType.None,
        });
        break;
      case "Top":
        let tmp = [...target.entities].slice(1);
        tmp.unshift({
          uuid: uuidv4(),
          text: "",
          ref: refEntity,
          isFocus: false,
          keyType: KeyType.None,
        });
        target.entities = [target.entities[0], ...tmp];
        break;
    }
    this.generatePoint(target);
  }

  public isBox(target: Entity): boolean {
    return (target as Box).entities !== undefined;
  }
  public isLine(target: Entity): boolean {
    return (target as Line).startType !== undefined;
  }
  public isPoint(target: Entity): boolean {
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
  public handleMouseLeave(e: React.MouseEvent<HTMLDivElement>): void {
    this.handleMouseUp(e);
  }

  @action.bound
  private checkValidPosition (target : Position) : boolean {
    const ref = this.store.svgRef;
    if (!ref || !ref.current) return false;
    const rect = ref.current.getClientRects()[0];
    return (target.x < rect.width && target.y < rect.height)
  }

  @action.bound
  public handleMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    if (!this.isEditable) return;
    const { svgRef } = this.store;
    let current: Position = {
      x: e.clientX - svgRef.current!.getClientRects()[0].left,
      y: e.clientY - svgRef.current!.getClientRects()[0].top,
    };
    if (!this.checkValidPosition(current)) return;
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
  private reCalculatePosition(): void {
    let tmp = [...this.store.lines];
    tmp.forEach((e) => {
      e.startPosition = this.calculatePositionFromInfomation(e.startInfo);
      e.stopPosition = this.calculatePositionFromInfomation(e.stopInfo);
    });
    this.store.lines = tmp;
  }

  @action.bound
  public handleMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (!this.isEditable) return;
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
    if (!this.isEditable) return;
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

    // this.clearSelection();
    this.clearSelectionLine();
    const focusEntity = this.store.focusEntity;
    if (!focusEntity) return;
    if (this.isBox(focusEntity)) {
      let tmp = [...this.store.boxes];
      tmp = tmp.map((e) => {
        e.isSelect = false;
        return e;
      });
      tmp.find((e) => e.uuid === focusEntity.uuid)!.isSelect = true;
      this.store.boxes = tmp;
    }
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
    // this.clearSelection();
    this.clearSelectionBoxes();
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
  public getPointFromInfo(info: LineInfoBox): Point | undefined {
    return info.box.points.find(
      (e) => e.level === info.level && e.position === info.pointPosition
    );
  }

  @action.bound
  public deleteLine(id: string): void {
    console.log('deleting line..')
    this.store.lines = this.store.lines.filter((e) => !(e.uuid === id));
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

  @action.bound
  public onSelectLine(line: Line): void {
    if (!this.isEditable) return;
    let tmp = [...this.store.lines];
    tmp.find((e) => e.uuid === line.uuid)!.isSelect = true;
    this.store.focusEntity = tmp.find((e) => e.uuid === line.uuid)!;
    this.store.lines = tmp;
  }

  @action.bound
  public generatePoint(box: Box): void {
    const _points: Array<Point> = [];
    box.entities.forEach((en, key) => {
      const L = React.createRef<SVGSVGElement>();
      const R = React.createRef<SVGSVGElement>();
      _points.push({
        uuid: uuidv4(),
        isHover: false,
        ref: L,
        position: PointPosition.Left,
        parentRef: en.ref,
        level: key,
      });
      _points.push({
        uuid: uuidv4(),
        isHover: false,
        ref: R,
        position: PointPosition.Right,
        parentRef: en.ref,
        level: key,
      });
    });
    this.addBoxPoints(box, _points);
  }

  @action.bound
  public onFocusField(box: Box, key: number): void {
    let tmp = [
      ...this.store.boxes.find((e) => e.uuid === box.uuid)!.entities,
    ].map((e) => {
      e.isFocus = false;
      return e;
    });
    tmp[key].isFocus = true;
    this.store.boxes.find((e) => e.uuid === box.uuid)!.entities = tmp;
  }

  @action.bound
  public onSetFieldKeyType(keyType: KeyType): void {
    const { focusEntity } = this.store;
    if (!focusEntity) return;
    if (!this.isBox(focusEntity)) return;
    this.store.boxes = this.store.boxes.map((e) => {
      if (e.isSelect && e.entities.some((e) => e.isFocus))
        e.entities.find((e) => e.isFocus)!.keyType = keyType;
      return e;
    });
  }

  @action.bound
  public changeLineType(point: "Start" | "Stop", type: LineType): void {
    const { focusEntity } = this.store;
    if (!focusEntity) return;
    if (!this.isLine(focusEntity)) return;
    const target = focusEntity as Line;
    switch (point) {
      case "Start":
        target.startType = type;
        break;
      case "Stop":
        target.stopType = type;
        break;
    }
  }
}
