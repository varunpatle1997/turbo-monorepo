import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { mount } from "@vue/test-utils";
import UserForm from "@/components/UserForm.vue";
import { userSchema } from "@repo/zod-schemas";
import { nextTick } from "vue";

vi.mock("axios");

vi.stubGlobal("VITE_API_BASE_URL", "http://mock-api.com");

describe("UserForm.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(UserForm);
    expect(wrapper.find("h1").text()).toBe("User Form");
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("validates form submission", async () => {
    const wrapper = mount(UserForm);
    const nameInput = wrapper.find("#name");
    const emailInput = wrapper.find("#email");
    const form = wrapper.find("form");

    await nameInput.setValue("John Doe");
    await emailInput.setValue("invalid-email"); // Invalid email
    await form.trigger("submit.prevent");

    expect(wrapper.text()).toContain("Invalid email");
  });

  it("submits valid data", async () => {
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: { message: "Form submitted successfully" },
    });

    const wrapper = mount(UserForm);

    await wrapper.find("input#name").setValue("John Doe");
    await wrapper.find("input#email").setValue("john@example.com");

    await wrapper.find("form").trigger("submit");

    await nextTick();

    expect(wrapper.text()).toContain("Form submitted successfully");
  });

  it("calls Zod validation before submitting", async () => {
    const validateSpy = vi.spyOn(userSchema, "parse");

    const wrapper = mount(UserForm);
    const nameInput = wrapper.find("#name");
    const emailInput = wrapper.find("#email");
    const form = wrapper.find("form");

    await nameInput.setValue("John Doe");
    await emailInput.setValue("johndoe@example.com");
    await form.trigger("submit.prevent");

    expect(validateSpy).toHaveBeenCalled();
  });
});
