<template>
  <div>
    <div v-for="(item, i) in episodesBySeason" :key="i">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import EPISODES from "@/constants/episodes";

export default {
  name: "EpisodesList",
  computed: {
    ...mapGetters("episodes", {
      allEpisodes: "allEpisodes",
      episodesBySeason: "episodesBySeason",
    }),
  },
  methods: {
    ...mapActions("episodes", {
      fetchAllEpisodes: "fetchAllEpisodes",
      fetchEpisodesBySeason: "fetchEpisodesBySeason",
    }),
  },
  async mounted() {
    if (this.allEpisodes.length === 0) {
      await this.fetchAllEpisodes();
    }

    await this.fetchEpisodesBySeason(EPISODES.DEFAULT_SEASON);
  },
};
</script>
