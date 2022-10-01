export default {
    instanceTime({ commit }, now) {
        commit("checkPerformance", now)
    }
}