<template>
  <div class="musician">
    <header>
      <h3>music list({ke})</h3>
    </header>
    <ul class="musician-list">
      <li class="musician-item">
        <img src="#">
        <div>
          <h2>keke</h2>
          <p>4 album,  9 mv</p>
        </div>
      </li>
      <li class="musician-item">
        <img src="#">
        <div>
          <h2>keke</h2>
          <p>4 album,  9 mv</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'musician',
    components: { 
    },
    data() {
      return {
        
      }
    },
    computed: {
      
    },
    created() {
      
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .musician {
    padding: 40px;
    header {
      border-bottom: 2px solid #c20c0c;
      text-align: left;
      h3 {
        margin-bottom: 5px;

        font-size: 20px;
        line-height: 28px;
      }
    }
    ul.musician-list {
      li:not(:first-child) {
        border-top: 1px solid #ddd;
      }
      li.musician-item {
        display: flex;
        padding: 10px 0;
        img {
          width: 80px;
          height: 80px;
        }
        div {
          margin-left: 10px;
          text-align: left;
          h2 {
            margin: 10px 0;

            font-size: 16px;
            line-height: 21px;
          }
          p {
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>