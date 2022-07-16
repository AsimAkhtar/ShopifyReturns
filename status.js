/*
portal_name = returns.yourstore.com
accept_returns = true or false
new_return_id = {{ checkout.attributes.atonce_return | json }}
first_time_accessed = {% if first_time_accessed %}
order_num = {{ checkout.order_number | json }}
order_zip = {{ checkout.shipping_address.zip | json }}
*/

function AtOnceReturns(portal_name, accept_returns, new_return_id, first_time_accessed, order_num, order_zip) {
    let return_id = null
    let a_style = `font-weight:600;padding: 0.75rem 1rem;border: 1px solid #ddd;border-radius: 5px;`

    if (new_return_id) {
        return_id = new_return_id
    }

    if (return_id) {
        let portal_link = `http://${portal_name}?return=${return_id}`
        if (first_time_accessed) {
            window.location.href = portal_link
            return([])
        } else {
            let rt_1 = `All Set! No Return Needed`
            if (accept_returns) { 
                rt_1 = `Create Returns Label/View Updates`
            }
            return ([
            `<h2>${rt_1}</h2>`,
            `<br/><a style="${a_style}" href="${portal_link}" target="_blank">Visit Exchange Portal</a><p> </p><br/>`
            ])
        }
    } else {

        let oc_ = ''
        try { 
            order_num = `${order_num}`.replace(/\s/g, "").replace(/\D/g, "").trimStart().trimEnd().toUpperCase()
            order_zip = `${order_zip}`.replace(/\s/g, "").trimStart().trimEnd().toUpperCase()
            oc_ = `?order=${order_num}_atonce_${order_zip}`
        } catch (error) {}

        let rx_1 = `Refund`
        if (accept_returns) {
            rx_1 = `Return`
        }

        let rt_2 = `Easy ${rx_1}s & Exchanges`
        let rt_3 = `Need something else? ${rx_1}/exchange your items at once:`
        let rt_4 = `Start ${rx_1}`

        return([
            `<h2>${rt_2}</h2>`,
            `<p>${rt_3}</p><br/><br/><a style="${a_style}" href="http://${portal_name}${oc_}" target="_blank">${rt_4}</a><p> </p><br/>`
        ])
    }
}
