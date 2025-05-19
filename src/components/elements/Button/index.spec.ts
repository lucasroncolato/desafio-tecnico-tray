import { mount } from "@vue/test-utils";
import Button from "./index.vue";

describe("Button", () => {
  it("renderiza o slot corretamente", () => {
    const wrapper = mount(Button, {
      slots: { default: "Clique aqui" },
    });
    expect(wrapper.text()).toContain("Clique aqui");
  });

  it("emite evento de click", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("aplica classes de cor e tamanho", () => {
    const wrapper = mount(Button, {
      props: { color: "secondary", size: "lg" },
    });
    expect(wrapper.classes()).toContain("bg-white");
    expect(wrapper.classes()).toContain("py-6");
  });
});
