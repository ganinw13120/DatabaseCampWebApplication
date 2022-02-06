import {
  ActionType,
  Box,
  BoxDetail,
  Entity,
  Line,
  LineInfoBox,
  Point,
  Position,
} from "@model/Drawer";

export default interface IDrawerStore {
  clearSelection(): void;
  setCurrentMousePosition(newPosition: Position): void;
  deleteEntity(): void;
  addRelation(): void;
  changeFields(amount: number): void;
  // removeField (target : Box) : void
  addField(type: "Buttom" | "Top", focusBox?: Box): void;
  store: Store;
  getFocusLine(): Line | null;
  getFocusBox(): Box | null;

  handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void;
  handleMouseUp(e: React.MouseEvent<HTMLDivElement>): void;
  handleMouseDown(e: React.MouseEvent<HTMLDivElement>): void;

  onBackgroundClick(): void;

  addBoxPoints(box: Box, points: Point[]): void;

  onEntityUpdate(box: Box, entity: BoxDetail): void;

  onPointUpdate(point: Point): void;

  getPointFromInfo(info: LineInfoBox): Point;

  onHoverBox(box: Box): void;
  onUnHoverBox(box: Box): void;

  getDrawerOffset () : Position;
  getSvgOffset () : Position;
}

export type Store = {
  currentPosition: Position;
  lastPosition: Position;
  lines: Line[];
  boxes: Box[];
  focusEntity: Entity | null;
  actionType: ActionType;
  containerRef: React.RefObject<HTMLDivElement>;
  svgRef: React.RefObject<SVGSVGElement>;
};
