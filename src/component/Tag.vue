<template>
    <div class="tabs">
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.path"
            :closable="tag.name != 'home'"
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)"
            :effect="$route.name == tag.name ? 'dark': 'plain'"
            size="small"
        >
        {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name:"Tag",
    computed:{
        ...mapState({
            tags: state => state.tab.tabList
        })

    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag跳转
        changeMenu(item){
            this.$router.push({name: item.name})
        },
        handleClose(tag,index){
            const length = this.tags.length-1
            
            console.log("index",index,'length',length)
            console.log(this.tags[index-1])
            //删除
            
            //删除之后的跳转
            if(tag.name !== this.$route.name){
                console.log('不是本身')
                // return
            }
                //表示删除的是最后一项
            if(index === length){
                console.log('66666')
                console.log(this.tags[index-1].name)
                // console.log(this.$router)
                this.$router.push({
                    name:this.tags[index-1].name
                    
                })

            }else{
                console.log('99999  ')
                console.log(this.tags[index].name)
                this.$router.push({
                    name:this.tags[index+1].name
                })
            }
            this.closeTag(tag)

        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>