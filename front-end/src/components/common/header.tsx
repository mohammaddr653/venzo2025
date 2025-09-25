import { BREAK_POINTS } from "../../../config";
import { useEffect, useState } from "react";
import { useWidthStore } from "../../store";
import MobileHeader from "./mobileHeader";
import DesktopHeader from "./desktopHeader";

interface HeaderProps {
  focus: boolean; //if its true cuses some changes in style and the header gets focus
}

const Header = (props: HeaderProps) => {
  const { width, setWidth } = useWidthStore();

  return (
    <>
      {width < BREAK_POINTS.md ? (
        <MobileHeader focus={props.focus}></MobileHeader>
      ) : (
        <DesktopHeader focus={props.focus}></DesktopHeader>
      )}
    </>
  );
};

export default Header;
