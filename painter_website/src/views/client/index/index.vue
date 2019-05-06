<template>
  <div class="index-container">
    <head-content></head-content>
    <div class="main center-content">
      <Profile/>
      <Photos/>
      <News/>
    </div>
    <footer class="footer center-content"> 
      <Foot/>
    </footer>
  </div>
</template>

<script>
import HeadContent from './HeadContent'
import Profile from './Profile'
import Photos from './Photos'
import News from './News'
import Foot from './Foot'
export default {
  components: {
    HeadContent,
    Profile,
    Photos,
    News,
    Foot
  }
}
</script>

<style lang="less" scoped>
  .center-content {
    width: 1024px;
    margin: 0 auto
  }

  .index-container {
    background-color: #fff;
//     background-image: url('../../../assets/img/index_bg.png');
//     background-size: 100%;
//     background-repeat: no-repeat;
  }
</style>




