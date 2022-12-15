<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <h5 class="mb-2">Vocalisation samples</h5>
        <el-menu default-active="1" class="el-menu-vertical">
          <el-menu-item v-for="i in 50" :key="i" :index="i">
            Sample {{i}}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style>
.el-aside {
  text-align: left;
}
</style>