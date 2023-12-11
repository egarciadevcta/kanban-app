import { describe, it, expect, vitest } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useBoardStore } from "../../stores/board";
import Board from "../Board.vue";

describe("Board", () => {
  it("renders correctly", async () => {
    const wrapper = shallowMount(Board, {
      global: {
        plugins: [createTestingPinia({ createSpy: vitest.fn })],
      },
    });
    const store = useBoardStore;

    expect(wrapper.html()).toMatchSnapshot();
  });
});
