import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders the correct message", () => {
    const msg = "Hello Vue 3!";
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });

    expect(wrapper.find("h1").text()).toBe(msg);
  });

  it("increments the counter when button is clicked", async () => {
    const wrapper = mount(HelloWorld);

    const button = wrapper.find("button");
    expect(button.text()).toContain("count is 0");

    await button.trigger("click");
    expect(button.text()).toContain("count is 1");

    await button.trigger("click");
    expect(button.text()).toContain("count is 2");
  });
});
