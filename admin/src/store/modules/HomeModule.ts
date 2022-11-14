import link from "../../api/link.js";
import apiUrl from "../../api/url.js";

let HomeModule: Record<string, unknown> = {
    state: {
        navBool: false,
        dialogFormVisible: false,
        // 弹出框默认不弹出
        uplistData: {},

        listdata: []
    },
    mutations: {
        // 为了切换登陆与注册按钮的选择时调用的方法状态
        SET_NAV_BOOL(state: any) {
            state.navBool = !state.navBool;
        },
        SET_DIALOG(state: any, paylog: any) {
            // paylog接受任意对象
            state.dialogFormVisible = !state.dialogFormVisible;
// 修改
            state.uplistData = paylog

        },
        DIALOG(state: any) {
            state.dialogFormVisible = !state.dialogFormVisible;
            window.location.reload()//修改提交自动刷新

        },
        // 数据的修改
        LISTDATA(state: any, paylog: any) {
            state.listdata = paylog
        },
       
    },
    actions: {
        // // 发送数据
        USERUPDATE_LIST(context: any) {
            link(apiUrl.userlist).then((ok: any) => {
                console.log(ok);

                context.commit("LISTDATA", ok.data)

            });
        },
        DEL_DATA(context: any,payload:any){
            link(apiUrl.userlist+"/"+payload.id,"delete").then((ok: any) => {
                    console.log(ok)
                    window.location.reload()//删除后自动刷新



            });
        }
    },
    getters: {

    }
}

export default HomeModule