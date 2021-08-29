<template>
  <el-card class="publish">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
        <el-tiptap v-model="form.content" :extensions="extensions" lang="zh" height="400"></el-tiptap>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="form.channel_id" placeholder="请选择" clearable>
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <!-- <template v-if="articleId">
          <el-button type="primary" @click="handleEdit(false)">修改</el-button>
        </template> -->
        <template>
          <el-button type="primary" @click="handleAdd(false)">发表</el-button>
          <el-button @click="handleAdd(true)">存入草稿</el-button>
        </template>

      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  /**
   * time          2021-8-26 10:22:50 ?F10: PM?
   */
  import codemirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/xml/xml.js'
  import 'element-tiptap/lib/index.css'
  import {
    ElementTiptap, // 需要的 extensions
    Doc,
    Text,
    Paragraph,
    Heading,
    Bold,
    Underline,
    Italic,
    Strike,
    ListItem,
    BulletList,
    OrderedList,
    TodoItem,
    TodoList,
    Fullscreen,
    FontType,
    FontSize,
    Image,
    Preview,
    FormatClear,
    TextColor,
    TextHighlight,
    CodeView,
    CodeBlock,
    TextAlign
  } from 'element-tiptap'
  import {
    getChannels,
    addArticle,
    articleInfo,
    editArticle
  } from '@/api/article'
  import {
    uploadImg
  } from '@/api/images'
  export default {
    name: 'Publish',
    components: {
      'el-tiptap': ElementTiptap
    },
    data() {
      return {
        extensions: [
          // 编辑器的 extensions
          // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({
            level: 5
          }),
          new Bold({
            // bubble: true
          }), // 在气泡菜单中渲染菜单按钮
          new Underline({
            // bubble: true,
            // menubar: false
          }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Fullscreen(),
          new FontType(),
          new FontSize(),
          new Image({
            //默认把图片生成base64
            //uploadRequest 得到Promise 可以通过把图片通过接口上传到服务器，返回它的url
            uploadRequest: function(file) {
              let formData = new FormData()
              formData.append('image', file)
              let url = ''
              return uploadImg(formData).then(res => {
                url = res.data.url
                return url
              }).catch(() => {
                url = ''
                return url
              })

            }
          }),
          new Preview(),
          new FormatClear(),
          new TextColor(),
          new TextHighlight(),
          new CodeView({
            codemirror
          }),
          new CodeBlock(),
          new TextAlign()
        ],
        form: {
          title: '',
          content: '<p></p>',
          cover: {
            type: 0,
            images: []
          },
          channel_id: ''
        },
        rules: {
          title: [{
              required: true,
              message: '标题必填',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          content: [{
            validator: this.validateContent,
            trigger: 'change'
          }],
          channel_id: [{
            required: true,
            message: '频道必选',
            trigger: 'change'
          }]
        },
        channels: [],
        articleId: ''
      }
    },
    created() {
      this.getChannelsData()
      this.articleId = this.$route.query.id ? this.$route.query.id : ''
      if (this.articleId) {
        this.getArticleInfo(this.articleId)
      }
    },
    methods: {
      // 校验内容
      validateContent(rule, value, callback) {
        console.log(value)
        if (value === '<p></p>') {
          callback('内容必填')
        } else {
          callback()
        }

      },
      // 新增（发表）
      handleAdd(draft) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.articleId) {
              editArticle(draft, this.form, this.articleId).then(res => {
                let mes = draft ? '保存草稿成功' : '发表成功'
                this.$message.success(mes)
                this.$router.push('/article')
              })
            } else {
              addArticle(draft, this.form).then(res => {
                let mes = draft ? '保存草稿成功' : '发表成功'
                this.$message.success(mes)
                this.$router.push('/article')
              })
            }
          }
        })
      },
      //获取文章信息
      getArticleInfo(articleId) {
        articleInfo(articleId).then(res => {
          console.log(res)
          this.form = res.data
        })
      },
      //修改
      // handleEdit(){
      //   editArticle().then(res=>{

      //   })
      // },
      // 获取频道
      getChannelsData() {
        getChannels().then(res => {
          console.log(res)
          this.channels = res.data.channels
        }).catch(() => {
          this.channels = []
        })
      }
    },
    destroyed() {
      this.articleId = ''
    }
  }
</script>

<style scoped>

</style>
