<template>
    <div id="app">
        <h3>案例：折叠面板</h3>
        <div class="box">

            <div class="title">
                <h4>芙蓉楼送辛渐</h4>
                <!-- 按钮位置 -->
                <span class="btn" @click="isShow = !isShow">
                    {{ isShow ? '收起' : '展开' }}
                </span>
            </div>

            <!-- 切换显示隐藏的部分 (数据驱动) -->
            <div v-show="isShow" class="container">
                <p>寒雨连江夜入吴，</p>
                <p>平明送客楚山孤。</p>
                <p>洛阳亲友如相问，</p>
                <p>一片冰心在玉壶。</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Fold',
    data() {
        return {
            isShow: true
        }
    }
}
</script>

<style lang="less">
h3 {
    text-align: center;
}

.box {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
}

.title {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 20px;
}

.title h4 {
    line-height: 2;
    margin: 0;
}

.container {
    padding: 0 20px;
    border-top: 1px solid #ccc;
}

.btn {
    /* 鼠标改成手的形状 */
    cursor: pointer;
}
</style>