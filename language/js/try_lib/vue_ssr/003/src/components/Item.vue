<template>
    <div>
        <div class="page-item">Page Item</div>
        <p><button @click="count--">-</button>{{count}}<button @click="count++">+</button></p>
    </div>
</template>
<style lang="css">
body {
    color: red !important;
}
</style>
<script>
export default {
    asyncData({ store, route }) {
        // console.log(route)
        // console.log(store.state)
        return
    },
    data() {
        return {
            count: 10
        }
    }
}
</script>