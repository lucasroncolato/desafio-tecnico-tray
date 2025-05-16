import { mount } from "@vue/test-utils";
import BaseButton from "./index.vue";

describe("BaseButton", () => {
  it("renderiza o slot corretamente", () => {
    const wrapper = mount(BaseButton, {
      slots: { default: "Clique aqui" },
    });
    expect(wrapper.text()).toContain("Clique aqui");
  });

  it("emite evento de click", async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("aplica classes de cor e tamanho", () => {
    const wrapper = mount(BaseButton, {
      props: { color: "secondary", size: "lg" },
    });
    expect(wrapper.classes()).toContain("bg-white");
    expect(wrapper.classes()).toContain("py-6");
  });
});
