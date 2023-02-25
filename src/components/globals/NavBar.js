import React, { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const NavBar = (props) => {
  const [menu, setMenu] = useState();

  // Media querys para realizar ciertas cosas
  const mediaqueryList = window.matchMedia("(min-width: 1200px)");
  mediaqueryList.addListener(function (EventoMediaQueryList) {
    if (mediaqueryList.matches) {
      // alert('La media query se cumple');
      document.getElementById("side-bar").className =
        " side-bar-menu open-menu  animate__animated animate__fadeInLeftBig";
      setMenu(true);
    }
  });
  const mediaqueryListMax = window.matchMedia("(max-width: 1200px)");
  mediaqueryList.addListener(function (EventoMediaQueryList) {
    if (mediaqueryListMax.matches) {
      // alert('La media query se cumple');
      document.getElementById("side-bar").className =
        " side-bar-menu close-menu animate__animated animate__fadeOutLeft animate__fadeInLeftBig";
      setMenu(false);
    }
  });

  const max1200 = window.matchMedia("(max-width: 1200px)");

  // Para cerrar modal en cualquier lado respetando la Media query
  React.useEffect(() => {
    mediaqueryList.addListener(function (EventoMediaQueryList) {
      if (max1200.matches) {
        document.addEventListener("click", function (event) {
          if (max1200.matches) {
            if (
              event.target.id != "side-bar" &&
              event.target.id != "side-bar-option" &&
              event.target.id != "nav-menu" &&
              event.target.id != "btn-close"
            ) {
              document.getElementById("side-bar").className =
                " side-bar-menu close-menu animate__animated animate__fadeOutLeft animate__fadeInLeftBig";
              setMenu(false);
            }
          }
        });
      }
    });
  }, [max1200]);



  const closeSideBar = () => {
    if (menu) {
      document.getElementById("side-bar").className =
        " side-bar-menu close-menu animate__animated animate__fadeOutLeft animate__fadeInLeftBig";
      setMenu(false);
    }
  };

  const openSideBar = () => {
    if (!menu) {
      document.getElementById("side-bar").className =
        " side-bar-menu open-menu  animate__animated animate__fadeInLeftBig";
      setMenu(true);
    }
  };

  return (
    <nav id="nav-menu" className="nav-menu-float ">
      <div className="content-nav-menu">
        <div className="d-flex">
          <div className="">
            <Link to="/">
              {" "}
              <AiTwotoneHome />
            </Link>
          </div>
          &nbsp; &nbsp; &nbsp;
          <p className="mt-1">
            {" "}
            <span>/ </span> &nbsp; &nbsp;<span> {props.titule} </span>{" "}
          </p>
        </div>
        <div></div>
        {menu === true ? (
          <button onClick={closeSideBar} className="bt-mobile" id="btn-close">
            <IoMdMenu id="btn-close" />
          </button>
        ) : (
          <button onClick={openSideBar} className="bt-mobile" id="btn-close">
            <MdMenuOpen id="btn-close" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
