new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: null,
        from: 'USD',
        to: 'COP',
        result: null,
        API_KEY: 'f40f1d9f777ccaa3bf35',
        loading: false
    },
    mounted(){
        //this is a good place for making calls to apis
        this.getCurrencies();
    },
    computed: {
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(3);
        },
        amountIsNull(){
            return !this.amount || this.loading;
        }
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies');

            if(currencies){
                this.currencies = JSON.parse(currencies);
                return;
            }

            axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${this.API_KEY}`).then(response => {
                console.log(response);
                this.currencies = response.data.results;
                localStorage.setItem('currencies', JSON.stringify(this.currencies));
            })
        },
        convertCurrency(){
            if(this.amountIsNull)
                return;

            this.loading = true;
            let currentCurrencies = `${this.from}_${this.to}`;
            axios.get(`https://free.currconv.com/api/v7/convert?apiKey=${this.API_KEY}&q=${currentCurrencies}&compact=y`).then(response => {
                console.log(response);
                this.result = response.data[currentCurrencies].val;
                this.loading = false;
            });
        }
    },
    watch: {
        from(){
            this.result = 0;
        },
        to(){
            this.result = 0;
        }
    }
})