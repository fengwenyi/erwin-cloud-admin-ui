<template>
    <div>
        类目管理
    </div>
</template>

<script>
    // import { apiBlogSystemCategoryGetPageList } from "@/api/ApiData"

	export default {
		name: "CategoryManagement",
        data () {
		    return {
		    	page: {
		    		currentPage: 1
                }
            }
        },
        methods: {
			getData() {
				// apiBlogSystemCategoryGetPageList(this.page.currentPage).then(result => {
				// 	console.log(result)
                // })
            }
        },
        mounted() {
			this.getData()
		}
	}
</script>

<style scoped>

</style>
