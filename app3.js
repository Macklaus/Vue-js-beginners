Vue.component('card', {
    props: ['title', 'content'],
    data() {
        return {
            claps: 0
        }
    },
    template: `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">{{ title }}</h3>
                <div class="card-text">
                    {{ content }}
                </div>
                <div class="text-center text-muted display-4">
                    {{ claps }}
                </div>
                <button @click="clapArticle" class="btn btn-info btn-sm">Clap for me</button>
                <button @click="deleteArticle" class="btn btn-danger btn-sm">Delete me</button>
            </div>
        </div>
    `,
    methods: {
        deleteArticle(){
            this.$emit('delete-article', this.title);
        },
        clapArticle(){
            this.claps++;
        }
    }
})

new Vue({
    el: '#app',
    data: {
        articles: [{
            title: 'Build fullstock application with vue js',
            content: 'ontrary to popular belief, Lorem ipsum is not simply random text.'
        },{
            title: 'Where does it come from?',
            content: 'set up your own lorem random text to fill components in your UI for examples you are making!'
        }]
    },
    methods:{
        removeArticle(event){
            this.articles = this.articles.filter(article => article.title !== event);
        }
    }
})