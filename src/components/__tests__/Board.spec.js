import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import Header from "../Header.vue";
import Board from "../Board.vue";

describe("App", () => {
  const wrapper = mount(App);
  it("Render App Header", () => {
    wrapper.findComponent(Header);
    expect(wrapper.exists()).toBe(true);
  });
  it("Render Board(s)", () => {
    wrapper.findComponent(Board);
    expect(wrapper.exists()).toBe(true);
  });
});
