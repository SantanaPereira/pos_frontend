import React from "react";
import { shallow } from "enzyme";
import Passwordreset from "./passwordreset";

describe("Passwordreset", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Passwordreset />);
    expect(wrapper).toMatchSnapshot();
  });
});
