import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { matchers } from "jest-emotion";
expect.extend(matchers);

import RotateLoader from "../src/RotateLoader";
import { LoaderSizeMarginProps } from "../src/interfaces";
import { sizeMarginDefaults } from "../src/helpers";

describe("RotateLoader", () => {
  let loader: ReactWrapper;
  let props: LoaderSizeMarginProps;
  let defaultSize: number = 15;
  let defaultMargin: number = 2;
  let defaultColor: string = "#000000";
  let defaultUnit: string = "px";

  it("should match snapshot", () => {
    loader = mount(<RotateLoader />);
    expect(loader).toMatchSnapshot();
  });

  it("should contain default props if no props are passed", () => {
    props = loader.props();
    expect(props).toEqual(sizeMarginDefaults(defaultSize));
  });

  it("should contain styles created using default props", () => {
    expect(loader).toHaveStyleRule("background-color", defaultColor);
    expect(loader).toHaveStyleRule("height", `${defaultSize}${defaultUnit}`);
    expect(loader).toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);

    for (let i: number = 0; i < 2; i++) {
      expect(loader.find("div div").at(i)).toHaveStyleRule("background-color", defaultColor);
      expect(loader.find("div div").at(i)).toHaveStyleRule(
        "height",
        `${defaultSize}${defaultUnit}`
      );
      expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);
      let leftDefault: number = (i % 2 ? 1 : -1) * (26 + defaultMargin);

      expect(loader.find("div div").at(i)).toHaveStyleRule("left", `${leftDefault}${defaultUnit}`);
    }
  });

  it("should render null if loading prop is set as false", () => {
    loader = mount(<RotateLoader loading={false} />);
    expect(loader.isEmptyRender()).toBe(true);
  });

  it("should render the correct color based on prop", () => {
    let color: string = "#e2e2e2";
    loader = mount(<RotateLoader color={color} />);
    expect(loader).not.toHaveStyleRule("background-color", defaultColor);
    expect(loader).toHaveStyleRule("background-color", color);

    for (let i: number = 0; i < 2; i++) {
      expect(loader.find("div div").at(i)).not.toHaveStyleRule("background-color", defaultColor);
      expect(loader.find("div div").at(i)).toHaveStyleRule("background-color", color);
    }
  });

  it("should render the correct size based on props", () => {
    let size: number = 18;
    loader = mount(<RotateLoader size={size} />);

    expect(loader).not.toHaveStyleRule("height", `${defaultSize}${defaultUnit}`);
    expect(loader).not.toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);

    expect(loader).toHaveStyleRule("height", `${size}${defaultUnit}`);
    expect(loader).toHaveStyleRule("width", `${size}${defaultUnit}`);

    for (let i: number = 0; i < 2; i++) {
      expect(loader.find("div div").at(i)).not.toHaveStyleRule(
        "height",
        `${defaultSize}${defaultUnit}`
      );
      expect(loader.find("div div").at(i)).not.toHaveStyleRule(
        "width",
        `${defaultSize}${defaultUnit}`
      );

      expect(loader.find("div div").at(i)).toHaveStyleRule("height", `${size}${defaultUnit}`);
      expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${size}${defaultUnit}`);
    }
  });

  describe("size props", () => {
    it("should render the size with px unit when size is a number", () => {
      let size: number = 18;
      loader = mount(<RotateLoader size={size} />);

      expect(loader).not.toHaveStyleRule("height", `${defaultSize}${defaultUnit}`);
      expect(loader).not.toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);

      expect(loader).toHaveStyleRule("height", `${size}${defaultUnit}`);
      expect(loader).toHaveStyleRule("width", `${size}${defaultUnit}`);

      for (let i: number = 0; i < 2; i++) {
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "height",
          `${defaultSize}${defaultUnit}`
        );
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "width",
          `${defaultSize}${defaultUnit}`
        );

        expect(loader.find("div div").at(i)).toHaveStyleRule("height", `${size}${defaultUnit}`);
        expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${size}${defaultUnit}`);
      }
    });

    it("should render the size as is when size is a string with valid css unit", () => {
      let size: string = "18px";
      loader = mount(<RotateLoader size={size} />);

      expect(loader).not.toHaveStyleRule("height", `${defaultSize}${defaultUnit}`);
      expect(loader).not.toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);

      expect(loader).toHaveStyleRule("height", `${size}`);
      expect(loader).toHaveStyleRule("width", `${size}`);

      for (let i: number = 0; i < 2; i++) {
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "height",
          `${defaultSize}${defaultUnit}`
        );
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "width",
          `${defaultSize}${defaultUnit}`
        );

        expect(loader.find("div div").at(i)).toHaveStyleRule("height", `${size}`);
        expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${size}`);
      }
    });

    it("should render the size with default unit of px when the unit is incorrect", () => {
      let length: number = 18;
      let unit: string = "ad";
      let size: string = `${length}${unit}`;
      loader = mount(<RotateLoader size={size} />);

      expect(loader).not.toHaveStyleRule("height", `${defaultSize}${defaultUnit}`);
      expect(loader).not.toHaveStyleRule("width", `${defaultSize}${defaultUnit}`);

      expect(loader).toHaveStyleRule("height", `${length}${defaultUnit}`);
      expect(loader).toHaveStyleRule("width", `${length}${defaultUnit}`);

      for (let i: number = 0; i < 2; i++) {
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "height",
          `${defaultSize}${defaultUnit}`
        );
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "width",
          `${defaultSize}${defaultUnit}`
        );

        expect(loader.find("div div").at(i)).toHaveStyleRule("height", `${length}${defaultUnit}`);
        expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${length}${defaultUnit}`);
      }
    });
  });

  describe("margin props", () => {
    it("should render the margin with px unit when margin is a number", () => {
      let margin: number = 18;
      loader = mount(<RotateLoader margin={margin} />);

      for (let i: number = 0; i < 2; i++) {
        let leftDefault: number = (i % 2 ? 1 : -1) * (26 + defaultMargin);
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "left",
          `${leftDefault}${defaultUnit}`
        );

        let left: number = (i % 2 ? 1 : -1) * (26 + margin);
        expect(loader.find("div div").at(i)).toHaveStyleRule("left", `${left}${defaultUnit}`);
      }
    });

    it("should render the margin as is when margin is a string with valid css unit", () => {
      let length: number = 18;
      let unit: string = "px";
      let margin: string = `${length}${unit}`;
      loader = mount(<RotateLoader margin={margin} />);

      for (let i: number = 0; i < 2; i++) {
        let leftDefault: number = (i % 2 ? 1 : -1) * (26 + defaultMargin);
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "left",
          `${leftDefault}${defaultUnit}`
        );
        let left: number = (i % 2 ? 1 : -1) * (26 + length);
        expect(loader.find("div div").at(i)).toHaveStyleRule("left", `${left}${unit}`);
      }
    });

    it("should render the margin with default unit of px when the unit is incorrect", () => {
      let length: number = 18;
      let unit: string = "ad";
      let margin: string = `${length}${unit}`;
      loader = mount(<RotateLoader margin={margin} />);

      for (let i: number = 0; i < 2; i++) {
        let leftDefault: number = (i % 2 ? 1 : -1) * (26 + defaultMargin);
        expect(loader.find("div div").at(i)).not.toHaveStyleRule(
          "left",
          `${leftDefault}${defaultUnit}`
        );
        let left: number = (i % 2 ? 1 : -1) * (26 + length);
        expect(loader.find("div div").at(i)).toHaveStyleRule("left", `${left}${defaultUnit}`);
      }
    });
  });

  it("should render the css override based on props", () => {
    loader = mount(<RotateLoader css={"position: fixed; width: 100px; color: blue;"} />);
    expect(loader).not.toHaveStyleRule("position", "relative");
    expect(loader).toHaveStyleRule("position", "fixed");
    expect(loader).toHaveStyleRule("width", "100px");
    expect(loader).toHaveStyleRule("color", "blue");
  });
});
