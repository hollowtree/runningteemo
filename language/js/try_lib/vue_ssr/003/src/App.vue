<template>
    <div id="app">
        <div>Hello World!</div>
        <router-link to="/">Root</router-link>
        <router-link to="/home">Home</router-link>
        <router-link to="/item">Item</router-link>
        <router-view class="view"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style>
body {
    color: #222;
}
a {
    color: rgb(25, 33, 59);
    padding: 0 4px;
}
.view {
    margin: 50px 0;
}
</style>
