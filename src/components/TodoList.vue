<!-- eslint-disable  -->
<template >
  <div class="todo ">
   <div class="w-full h-screen dark:bg-black">
    <img :src="imgSrc" alt="todo background" class="absolute" />
    <div class="flex justify-between mx-4 relative top-10 sm:top-12 sm:justify-around sm:mx-4 md:mx-44 ">
      <h1 class="tracking-wide text-2xl font-bold text-white">T O D O</h1>

      <div class="w-5 "><img @click="toggleDark()" src="@/assets/images/icon-moon.svg" alt="" class="w-7"></div>

    </div>
    <div>
      <div class="relative flex flex-col justify-center items-center top-20 drop-shadow-2xl">

        <form class="flex w-80 sm:w-96   mb-5">
          <input type="text" v-model="textTask" placeholder="write your note" class=" pl-1 bg-white dark:bg-blue-900
           border-black rounded-l-sm outline-none w-80 sm:w-96 dark:text-white">
          <button class="p-4 bg-slate-800 text-white " @click.prevent="AddTask()">Add</button>
        </form>
        <!-- task list -->
        <div v-for=" (task, index) in tasks" class="flex bg-white w-80 sm:w-96 mx-3 py-2 justify-between text-left
         border-b-cyan-900 rounded-l-sm border-bottom font-normal dark:bg-blue-900 dark:text-white"
          @click="task.done = !task.done">

          <div class="flex task " :style="{ 'text-decoration': task.done ? 'line-through' : '' }">
            <span><img class="check  mt-1 mx-3   border-r-blue-400  border-width   rounded-full w-5 p-1 "
                src="@/assets/images/icon-check.svg" alt=""
                :style="{ 'background': task.done ? 'rgb(96 165 250 / var(--tw-border-opacity))' : '' }"></span>
            {{ task.words }}
          </div>
          <button class=" mr-2 w-3 mt-1" @click.prevent="DeleteTask(index)"><img src="@/assets/images/icon-cross.svg"
              alt=""></button>

        </div>
        <!-- parameter of tasks -->
        <div
          class="box-prametre bg-white w-80 sm:w-96 py-1 justify-between dark:bg-blue-900 dark:text-white px-4 font-size-parameter text-gray-600 hidden">
          <span>{{ tasks.length }} items left</span>
          <div>
            <span @click="ALL()">All</span><span class="mx-2" @click="ActiveTask()">Active</span><span
              @click="Mentor()">Mentor</span>
          </div>
          <span @click="DeleteAll()"><button>Clear Completed</button></span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<!-- eslint-disable  -->
<style>
img {
  width: 100%;
}

;

.border-bottom {
  border-bottom: 1px solid gray;
}
</style>
<!-- eslint-disable  -->
<script>
export default {
  head: {
    link: [
      {
        rel: "icon",
        href: require("@/assets/images/icon-sun.svg"),
      },
    ],
  },
  data() {
    return {
      imgSrc: require("@/assets/images/bg-desktop-light.jpg"),
      tasks: [],
      Active: [],
      textTask: "",
    };
  },
  mounted() {
    window.addEventListener("resize", this.changeImg);
    this.updateTasks()
  },
  methods: {
    changeImg() {
      if (window.innerWidth > 768) {
        this.imgSrc = require("@/assets/images/bg-desktop-light.jpg");
      } else {
        this.imgSrc = require("@/assets/images/bg-mobile-light.jpg");
      }
    },
    AddTask() {
      if (this.textTask !== "") {
        this.tasks.push({ words: this.textTask, done: false });
        this.textTask = "";
      }
      const boxPrametre = document.querySelector('.box-prametre')
      if (this.tasks.length !== 0) {
        boxPrametre.classList.remove('hidden')
        boxPrametre.classList.add('flex')
      }
    },
    DeleteTask(index) {
      this.tasks.splice(index, 1);
      const boxPrametre = document.querySelector('.box-prametre')
      if (this.tasks.length == 0) {
        boxPrametre.classList.remove('flex')
        boxPrametre.classList.add('hidden')
      }
    },
    DeleteAll() {
      this.tasks = "";
      const boxPrametre = document.querySelector('.box-prametre')
      boxPrametre.classList.remove('flex')
      boxPrametre.classList.add('hidden')
    },
    ActiveTask() {
      this.tasks = this.Active
      this.tasks = this.tasks.filter(item => item.done == false)
    },
    Mentor() {
      this.tasks = this.Active
      this.tasks = this.tasks.filter(item => item.done == true)
    },
    ALL() {
      this.tasks = this.Active
    },
    updateTasks() {
      this.Active = this.tasks
    }
  },
};
</script>
<!-- eslint-disable  -->
<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
