<template>
    <div>
        <header class="site-header jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                    <h1>请发表对Vue的评论</h1>
                    </div>
                </div>
            </div>
        </header>
        <div class="container">
            <addComment :addComment="addComment"/>
            <commentList :comments="comments" :deleteComment="deleteComment"/>
        </div>
    </div>
</template>

<script>
import addComment from "./components/addComment";
import commentList from "./components/commentList";
export default {
    data() {
    return {
      // 定义数据
    comments: [
        { id: 2, name: "jack", content: "I Love Rose" },
        { id: 1, name: "rose", content: "I Love Jack" },
    ],
    };
},
    components:{
        addComment,
        commentList
    },
    methods: {
        addComment(comment){
            this.comments.unshift(comment);
        },
        //删除评论,用过滤的方法
        deleteComment(id){
            this.comments=this.comments.filter(comment=>comment.id!=id);
        }
    },
}
</script>

<style lang="">
    
</style>