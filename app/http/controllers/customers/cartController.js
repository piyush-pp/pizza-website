function cartController(){
    return{
        index(re,res){
            res.render('customers/cart')
        },
        update(re,res){
            //for the first creation of the cart
            if(!re.session.cart){
                re.session.cart= {
                    items: {},
                    totalty: 0,
                    totalPrice: 0
                }
            }
            let cart=re.session.cart
            // console.log(re.body)
            //check if item does not exist in cart
            if(!cart.items[re.body._id]){
                cart.items[re.body._id]={
                    item: re.body,
                    qty : 1
                }
                cart.totalty = cart.totalty + 1
                cart.totalPrice = cart.totalPrice + re.body.price
            } else {
                cart.items[re.body._id].qty = cart.items[re.body._id].qty + 1
                cart.totalty = cart.totalty + 1
                cart.totalPrice = cart.totalPrice + re.body.price
            }
            return res.json({totalty : re.session.cart.totalty })
        }
    }
}
module.exports=cartController