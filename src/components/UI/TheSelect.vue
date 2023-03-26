<template>
  <div class="custom-select">
    <div class="label">
      {{ label }}
    </div>
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption }}
      <img
        :class="{ 'chevron-up': dropdownOpen, 'chevron-down': !dropdownOpen }"
        class="chevron"
        src="@/assets/icons/down.png"
      />
    </div>
    <div v-if="dropdownOpen" class="dropdown">
      <div
        v-for="option in options"
        class="option"
        :class="{active: selectedOption === option}"
        :key="option"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      selectedOption: this.options[0] || 'All',
      dropdownOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    selectOption(option) {
      this.selectedOption = option
      this.dropdownOpen = false
      this.$emit('selected', option)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/fonts.scss';
@import '@/assets/styles/colors.scss';

.custom-select {
  width: 100%;
  position: relative;
  display: inline-block;
  min-width: 150px;
  text-align: start;
}

.label {
  margin-bottom: 5px;
  font-size: $font-size-label;
}

.selected-option {
  display: flex;
  justify-content: space-between;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  background-color: white;
  font-size: $font-size-main;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  border: none;
  border-top: none;
  background-color: #fff;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  font-size: $font-size-main;
}

.option {
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: $select-item-bg;
  }
}

.active {
  background-color: $select-item-bg;
}

.chevron {
  width: 20px;
  margin-left: 20px;
}

.chevron-up {
  transform: rotate(180deg);
}

.chevron-down {
  transform: rotate(0deg);
}
</style>
