<script setup lang="ts"></script>

<template>
  <div class="modal left-border">
    <ul class="collections-list">
      <li class="collection-item">
        <div>
          <main-checkbox class="checkbox" />
          <div>
            <h3>collection title</h3>
            <toggle-icon-button
              class="toggle-button"
              :activeIcon="'bottom-arrow-icon.svg'"
              :inactiveIcon="'top-arrow-icon.svg'"
            />
          </div>
        </div>

        <ul class="dictionaries-list">
          <li>
            <main-checkbox color="background" class="checkbox" />
            <h4>dictionary title</h4>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.modal {
  background-color: var(--background-color);
  width: 360px; // temporarily
  padding: 15px 20px;
}

.collections-list {
  display: flex;
  justify-content: space-between;
  .collection-item {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        h3 {
          margin-right: 5px;
          font-weight: 400;
          font-size: 16px;
        }
      }
    }
    .dictionaries-list {
      background-color: var(--body-color);
      margin-top: 10px;
      min-width: 130px;
      padding: 5px;
      align-self: flex-end;
      border-radius: 5px 15px 5px 15px;
      li {
        display: flex;
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        h4 {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}

.checkbox {
  margin-right: 5px;
}

.toggle-button {
  transform: translateY(1px);
  width: 14px;
  height: 8px;
}
</style>
