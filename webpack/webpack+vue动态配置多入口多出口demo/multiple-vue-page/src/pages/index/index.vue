
<template>
  <div id="app">
<!--<body>-->
<ening-park-car></ening-park-car>
<ening-pass></ening-pass>
<ening-monitor-platform-of-project-num></ening-monitor-platform-of-project-num>
<equipment-operation-monitoring></equipment-operation-monitoring>
<caution></caution>
<!--</body>-->
  </div>
</template>

<script>
    import store from '@/pages/index/store/store.js'
    import eningParkCar from '@/pages/index/eningParkCar'
    import eningPass from '@/pages/index/eningPass'
    import EningMonitorPlatformOfProjectNum from '@/pages/index/EningMonitorPlatformOfProjectNum'
    import equipmentOperationMonitoring from '@/pages/index/equipmentOperationMonitoring'
    import caution from '@/pages/index/caution'
    export default {
        name: 'HelloWorld',
        data () {
            return {
            }
        },
        methods:{
        },
        mounted() {
        },
        components:{
            eningParkCar,
            eningPass,
            EningMonitorPlatformOfProjectNum,
            equipmentOperationMonitoring,
            caution,
        },
        store
    }
</script>

<style>



</style>
