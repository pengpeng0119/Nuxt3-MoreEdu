<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <n-button class="!text-xl !font-bold" text>梦真编程</n-button>
      <UiMenu>
        <UiMenuItem
          v-for="(item, index) in menu"
          :key="index"
          :active="isMenuItemActive(item)"
          @click="handelOpen(item.path)"
        >
          {{ item.name }}
        </UiMenuItem>
      </UiMenu>

      <n-button circle class="ml-auto mr-3" @click="openSearch">
        <template #icon>
          <n-icon><Search /></n-icon>
        </template>
      </n-button>

      <n-button secondary strong @click="myLogin" v-if="!user">登录</n-button>
      <n-dropdown :options="userOptions" v-else @select="handleSelect">
        <n-avatar
          round
          size="small"
          :src="
            user.avatar ||
            'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          "
        />
      </n-dropdown>
    </div>
  </div>
  <div class="h-[80px] w-[100%]"></div>
  <SearchBar ref="SearchBarRef"></SearchBar>
</template>

<script setup>
import { NButton, NIcon, NDropdown, NAvatar, createDiscreteApi } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
const user = useUser()
const isMenuItemActive = (item) => {
  if (item.match) {
    let i = item.match.findIndex((o) => {
      let res = true
      if (o.params && typeof o.params == 'object') {
        res =
          Object.keys(o.params).findIndex(
            (k) => route.params[k] == o.params[k]
          ) != -1
      }
      return o.name == route.name && res
    })
    return i != -1
  }
  return route.path == item.path
}
const userOptions = [
  {
    label: '用户中心',
    key: 'center'
  },
  {
    label: '退出',
    key: 'logout'
  }
]
const route = useRoute()
const menu = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '考试',
    path: '/paper/1',
    match: [
      {
        name: 'paper-page'
      }
    ]
  },
  {
    name: '拼团',
    path: '/list/group/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'group'
        }
      }
    ]
  },
  {
    name: '秒杀',
    path: '/list/flashsale/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'flashsale'
        }
      }
    ]
  },
  {
    name: '直播',
    path: '/list/live/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'live'
        }
      }
    ]
  },
  {
    name: '专栏',
    path: '/list/column/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'column'
        }
      }
    ]
  },
  {
    name: '电子书',
    path: '/list/book/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'book'
        }
      }
    ]
  },
  {
    name: '社区',
    path: '/bbs/0/1',
    match: [
      {
        name: 'bbs-bbs_id-page'
      }
    ]
  },
  {
    name: '课程',
    path: '/list/course/1',
    match: [
      {
        name: 'list-type-page',
        params: {
          type: 'course'
        }
      }
    ]
  }
]
// function handelOpen(path) {
//   navigateTo(path)
// }
// function toNav(path) {
//   console.log('秒发')
//   navigateTo(path)
// }
const handelOpen = throttle(navigateTo, 1000)

const SearchBarRef = ref(null)
const openSearch = () => {
  SearchBarRef.value.open()
}
function myLogin() {
  navigateTo({
    path: '/login'
  })
}
const handleSelect = async (k) => {
  switch (k) {
    case 'logout':
      const { dialog } = createDiscreteApi(['dialog'])
      dialog.warning({
        content: '是否要退出登录？',
        positiveText: '退出',
        negativeText: '取消',
        onPositiveClick: async () => {
          await useLogout()
        }
      })
      break
    case 'center':
      navigateTo({
        path: '/user/history/1'
      })
      break
  }
}
</script>

<style scoped>
.navbar {
  z-index: 999;
  @apply !bg-white fixed top-0 left-0 right-0 shadow-sm;
}
.menu {
  @apply flex items-center px-4;
}
</style>
