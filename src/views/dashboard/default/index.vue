<template>
    <div class="dashboard-editor-container">
        <div class=" clearfix">
            you are a normal person
        </div>
        <div>
            <img class='emptyGif' :src="emptyGif">
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'dashboard-default',
    components: { },
    data() {
      return {
        emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .emptyGif {
        display: block;
        width: 45%;
        margin: 0 auto;
    }

    .dashboard-editor-container {
        background-color: #e3e3e3;
        min-height: calc(100vh - 51px);
        margin-top: -50px;
        padding: 100px 60px 0px;
        .pan-info-roles {
            font-size: 12px;
            font-weight: 700;
            color: #333;
            display: block;
        }
        .info-container {
            position: relative;
            margin-left: 190px;
            height: 150px;
            line-height: 200px;
            .display_name {
                font-size: 48px;
                line-height: 48px;
                color: #212121;
                position: absolute;
                top: 25px;
            }
        }
    }
</style>
