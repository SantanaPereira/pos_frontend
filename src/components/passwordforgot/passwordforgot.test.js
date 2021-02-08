import React from "react";
import { shallow } from "enzyme";
import Passwordforgot from "./passwordforgot";

describe("Passwordforgot", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Passwordforgot />);
    expect(wrapper).toMatchSnapshot();
  });
});
