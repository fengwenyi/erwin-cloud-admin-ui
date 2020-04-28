<template>
    <div class="main-container">
        <div class="option-container">
            <Button type="primary" @click="handleOpenModalAdd">添加</Button>
        </div>

        <div class="data-container">
            <Table border :columns="columns" :data="dataList" :loading="tableLoading">
                <template slot-scope="{ row }" slot="status">
                    <Tag v-show="row.state" color="success">正常</Tag>
                    <Tag v-show="!row.state" color="default">停用</Tag>
                </template>

                <template slot-scope="{ row }" slot="option">

                    <Button type="primary" icon="md-create" @click="handleOpenModalUpdate(row)"></Button>
                    <Button type="error" style="margin-left: 15px" icon="ios-trash"
                            @click="handleOpenModalDeleteConfirm(row.id)"></Button>
                </template>
            </Table>
        </div>

        <div class="page-container">
            <Page :total="page.total" :current="page.currentPage" @on-change="handlePageGetData" :page-size="page.size"/>
        </div>

        <Modal
                v-model="modalVisible"
                :title="modalTitle"
                @on-cancel="handleModalCancel('form')">
            <Form ref="form" :model="form" :rules="formRule" label-position="left" :label-width="100">
                <FormItem label="分类名称" prop="categoryName">
                    <Input v-model="form.categoryName" placeholder="请输入分类名称"></Input>
                </FormItem>
                <FormItem label="排序" prop="sortNum">
                    <InputNumber :min="1" v-model="form.sortNum" placeholder=""></InputNumber><span class="tip-input-text">排序，从小到大排序</span>
                </FormItem>
                <FormItem label="状态" prop="state">
                    <RadioGroup v-model="form.state">
                        <Radio :label="true">正常</Radio>
                        <Radio class="form-radio-right" :label="false">停用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleFormSubmit('form')">Submit</Button>
                    <Button style="margin-left: 8px" @click="handleFormReset('form')">Reset</Button>
                </FormItem>
            </Form>
            <div slot="footer">
            </div>
        </Modal>

        <Modal v-model="modalDeleteVisible" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除后，数据无法恢复。</p>
                <p>是否继续删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modalLoading" @click="handleDelete">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { apiBlogSystemCategoryGetPageList, apiBlogSystemCategoryUpdateById, apiBlogSystemCategoryAdd } from "@/api/ApiData"
	import { dateFormat } from '@/libs/DateTimeUtils'

	export default {
		name: "CategoryManagement",
        data () {
		    return {
		    	page: {
		    		currentPage: 1,
					total: 0,
					size: 10,
					pages: 1
                },
				dataList: [],
				tableLoading: true,
				columns: [
					{
						title: '排序',
						key: 'sortNum'
					},
					{
						title: '分类名称',
						key: 'categoryName'
					},
					{
						title: '状态',
						slot: 'status',
						align: 'center'
					},
					{
						title: '创建时间',
						key: 'createTime',
						render: (h, params) => {
							return h('div',
								dateFormat(new Date(Number(params.row.createTime)), 'yyyy-MM-dd HH:mm:ss')
							)
						}
					},
					{
						title: '操作',
						slot: 'option',
						align: 'center'
					}
				],
				modalVisible: false,
				modalTitle: '',
				modalType: '',
				form: {
					categoryName: '',
					sortNum: 1,
					state: false
				},
				formRule: {
					categoryName: [
						{required: true, message: 'categoryName must not null', trigger: 'blur'}
					],
					sortNum: [
						{required: true, type: 'number', message: 'sortNum must not null', trigger: 'blur'}
					],
					state: [
						{required: true, type: 'boolean', message: 'sortNum must not null', trigger: 'blur'}
					]
				},
				id: '',
				modalDeleteVisible: false,
				modalLoading: false
            }
        },
        methods: {
			getData() {
				apiBlogSystemCategoryGetPageList(this.page.currentPage).then(result => {
					if (result.success) {
						this.dataList = result.data
						this.page.total = result.total
						this.page.size = result.size
						this.page.pages = result.pages
						this.page.currentPage = result.current
					}
					this.tableLoading = false
                })
            },
			// 点击分页获取数据
			handlePageGetData(val) {
				this.page.currentPage = val;
				this.getData()
			},
			// 表单重置
			handleFormReset(name) {
				this.$refs[name].resetFields()
			},
			// 打开修改modal
			handleOpenModalUpdate(val) {
				this.modalTitle = '编辑';
				this.modalType = 'update';
				this.form.categoryName = val.categoryName;
				this.form.sortNum = val.sortNum;
				this.form.state = val.state;
				this.id = val.id;
				this.modalVisible = true
			},
			// 关闭弹窗
			handleModalCancel(formName) {
				// 表单数据初始化
				this.handleFormReset(formName)
			},
            // 打开确认删除对话框
			handleOpenModalDeleteConfirm(id) {
				this.id = id
                this.modalDeleteVisible = true
            },
            // 删除
            handleDeleteById() {

				this.id = ''
            },
			// modal确认按钮
			handleFormSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.modalType === 'add') {
							apiBlogSystemCategoryAdd(this.form).then(result => {
								if (result.success) {
									this.$Message.success('Success')

									// 加载新的数据
									this.getData()

									this.modalVisible = false

									// 表单数据初始化
									this.handleFormReset(name)
								} else {
									this.$Message.error(result.message)
								}
							})
						} else if (this.modalType === 'update') {
							apiBlogSystemCategoryUpdateById(this.id, this.form).then(result => {
								if (result.success) {
									this.$Message.success('Success')

									// 加载新的数据
									this.getData()

									this.modalVisible = false

									// 表单数据初始化
									this.handleFormReset(name)
								} else {
									this.$Message.error(result.message)
								}
							})
						}
					}
				})
			},
			// 打开添加弹窗
			handleOpenModalAdd() {
				this.modalTitle = '添加';
				this.modalType = 'add';
				this.modalVisible = true
			},
        },
        mounted() {
			this.getData()
		}
	}
</script>

<style scoped lang="stylus">
    .tip-input-text
        margin-left 10px
        color #999
        font-size 12px
    .form-radio-right
        margin-left 20px
</style>
