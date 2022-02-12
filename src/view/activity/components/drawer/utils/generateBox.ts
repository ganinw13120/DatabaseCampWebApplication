import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  BoxDetail,
  KeyType,
  Point,
  PointPosition,
  Position,
} from "@model/Drawer";

const generateBox = (
  entities: Array<string>,
  id?: string,
  pos?: Position,
  addPoints?: boolean
): Box => {
  const ref = React.createRef<HTMLDivElement>();
  let entityList: Array<BoxDetail> = [];
  entities.forEach((e) => {
    const refEntity = React.createRef<HTMLDivElement>();
    entityList.push({
      text: e,
      ref: refEntity,
      uuid: uuidv4(),
      isFocus: false,
      keyType: KeyType.None,
    });
  });

  let box: Box = {
    ref: ref,
    uuid: id ? id : uuidv4(),
    points: [],
    entities: entityList,
    pos: pos
      ? pos
      : {
          x: 0,
          y: 0,
        },
    isSelect: false,
    isHover: false,
    isDragging: false,
  };
  if (addPoints) {
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
    box.points = _points;
  }
  return box;
};

export default generateBox;
