import { mount } from "@vue/test-utils";
import sunrise from "../components/sunrise.vue";
const mock = {
  id: 703448,
  dt: 1708454387,
  humidity: 93,
  pressure: 1008,
  temp: 31.1,
  city: "Kyiv",
  country: "UA",
  sunrise: 1708405299,
  sunset: 1708442530,
  timezone: 7200,
  weather: "light snow",
  winds: { speed: 1.99, deg: 253 },
};

describe("sunrise", () => {
  it("sunrise renders correctly", () => {
    const wrapper = mount(sunrise, {
      props: {
        details: mock,
      },
    });

    expect(wrapper.find(".sunrise").text()).toBe("7:01 am");
  });
});

describe("sunset", () => {
  it("sunset renders correctly", () => {
    const wrapper = mount(sunrise, {
      props: {
        details: mock,
      },
    });

    expect(wrapper.find(".sunset").text()).toBe("5:22 pm");
  });
});
