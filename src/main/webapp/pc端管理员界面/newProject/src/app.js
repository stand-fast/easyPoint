import pagemodel from "./components/pagemodel.js"

const template = `
    <div>
        <pagemodel></pagemodel>
        <RouterView></RouterView>
    </div>
`
export default {
    template,
    components: {
        pagemodel
    }
}