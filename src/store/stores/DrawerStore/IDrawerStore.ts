import {
  ActionType,
  Box,
  BoxDetail,
  Entity,
  Line,
  LineInfoBox,
  LineType,
  Point,
  Position,
} from "@model/Drawer";
import { KeyType } from "@model/Drawer";
import { DrawerAnswer, DrawerChoice } from "@model/Learning";
export default interface IDrawerStore {

  getDrawerAnswer() : DrawerAnswer;
  setupDrawer(info : DrawerChoice, isEditable : boolean) : void;
  setupLine (info : DrawerChoice) : void;
  clearSelection(): void;
  setCurrentMousePosition(newPosition: Position): void;
  deleteEntity(): void;
  addRelation(): void;
  changeFields(amount: number): void;
  // removeField (target : Box) : void
  addField(type: "Buttom" | "Top"): void;
  removeField(): void;
  store: Store;
  getFocusLine(): Line | null;
  getFocusBox(): Box | null;

  changeLineType(point : 'Start' | 'Stop', type: LineType): void;

  handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void;
  handleMouseUp(e: React.MouseEvent<HTMLDivElement>): void;
  handleMouseDown(e: React.MouseEvent<HTMLDivElement>): void;
  handleMouseLeave(e: React.MouseEvent<HTMLDivElement>): void;
  
  onBackgroundClick(): void;

  addBoxPoints(box: Box, points: Point[]): void;

  onEntityUpdate(box: Box, entity: BoxDetail): void;

  getPointFromInfo(info: LineInfoBox): Point | undefined;
  deleteLine(id: string): void;

  onHoverBox(box: Box): void;
  onUnHoverBox(box: Box): void;

  onFocusField(box: Box, key: number): void;
  onSetFieldKeyType(keyType: KeyType): void;

  getDrawerOffset(): Position;
  getSvgOffset(): Position;

  onSelectLine(line: Line): void;

  isBox(target: Entity): boolean;
  isLine(target: Entity): boolean;
  isPoint(target: Entity): boolean;

  generatePoint(box: Box): void;
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
