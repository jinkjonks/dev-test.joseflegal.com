import Vue from "vue";
import actions from "@/store/actions_types";
import mutations from "@/store/mutations_types";
import api from "@/api";

const Rules = {
  namespaced: true,
  state: {
    rules: {},
    rule_groups: {},
    answers: {},
  },
  getters: {
    answers: (state) => state.answers,
    rules: (state) => state.rules,
    rule_groups: (state) => state.rule_groups,
  },
  actions: {
    [actions.get]({ commit }) {
      try {
        Promise.all([
          api.answers.get(),
          api.rules.get(),
          api.rule_groups.get(),
        ]).then(([answers, rules, rule_groups]) => {
          commit(mutations.SET, { answers, rules, rule_groups });
        });
      } catch (error) {
        console.error("Error fetching rules data", error);
      }
    },
  },
  mutations: {
    [mutations.SET](state, { answers, rules, rule_groups }) {
      Vue.set(state, "answers", answers);
      Vue.set(state, "rules", rules);
      Vue.set(state, "rule_groups", rule_groups);
    },
  },
};
export default Rules;
