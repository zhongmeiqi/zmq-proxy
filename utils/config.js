export const PB_LBM = {
  //* **********900000-999999 普通功能号 请***先选择号段范围****然后****按顺序*****填写  START ***********************
  /** 操盘手消息重传补缺 */
  FIXED_MSG_LOAD: 920002,
  /** 业务心跳上报功能 */
  ET_BUSI_HEARTBREAK: 100030,
  /** 用户预登录检查 */
  USER_PRE_LOGIN_CHECK: 922006,
  USER_LOGIN: 922001,
  USER_LOGIN_OUT: 922002,
  /** 订阅权限检查 ,检查通过连接器会做相关订阅 */
  SUB_CHECK: 922003,
  /** 证券信息获取 */
  QUERY_STOCK_INFO: 44050,

  /** 923004 查询产品信息 */
  CACHE_FUND: 44051,
  /** 923005 查询资产单元信息 */
  CACHE_ASSET: 44052,
  /** 923021 查询投易通加载字典项 */
  QUERY_DICT: 44055,
  /** 查询交易日期表 */
  QUERY_EXPIREDATE: 923017,
  /** 投易通日志流水保存 */
  ET_LOGDETAIL_WRITE: 923018,

  /** 查询基金列表 */
  QUERY_FUND_PRODUCTS: 926001,
  /** 查询公募基金产品状态 */
  QUERY_PRODUCT_STATUS: 926002,
  /** 查询资管产品状态 */
  QUERY_ASSETS_MANAGEMENT_PRODUCT_STATUS: 926003,
  /** 查询基金名单 */
  QUERY_FUND_COMPANY: 926004,
  /** 推荐人查询 */
  QUERY_RECOMMENDER: 926005,
  /** 财富管理中心字典信息查询 */
  QUERY_USER_DICT: 926007,

  /** 查询静态资源模板文件信息 */
  QUERY_STATIC_RESOURCE_INFO: 923055,

  /** 查询机构下的全部产品 */
  CACHE_ORG_FUND: 923201,
  /** 查询机构下的全部资产单元 */
  CACHE_ORG_ASSET: 923202,

  //* **********900000-999999 普通功能号 请***先选择号段范围****然后****按顺序*****填写  END ***********************

  //* **********30000- 39999 交易功能号 请***先选择号段范围****然后****按顺序*****填写  START ***********************
  /** 期现对冲指令下达 两节点的指令下达 51 */
  HEDGE_INSTR_ORDER: 30001,
  /** 多指令下单  52 */
  INSTR_ORDER_MULTI: 30002,
  /** 批量下委托  54 */
  BATCH_ORDER: 30004,
  /** 批量指令证券撤销 55 */
  BATCH_INSTR_CANCEL: 30005,
  /** 批量拒绝指令审批 56 */
  BATCH_INSTR_REJECT_APPROVE: 30006,
  /** 批量指令证券审批拒绝(指令非下达流程的拒绝) 56 */
  BATCH_INSTR_APPROVE_REJECT: 30006,
  /** 批量指令证券追单(发起追单) 57 */
  BATCH_ADDITIONAL_ORDER: 30007,
  /** 批量指令停止策略执行 58 */
  AUTO_ADD_ORDER_STOP: 30008,
  /** 投资组合管理 59 */
  SCHEME_MANAGER_FUNC: 30009,
  /** 投易通对冲策略信息更新 60 */
  ET_STRATEGY_MODIFY: 30010,
  /** 指令证券批量审批通过(指令下达流程的审批) 61 */
  BATCH_INSTR_APPROVE: 30011,
  MSG_PUSH: 36001,
  NOTICE_PUSH: 36002,
  /** 委托撤销 */
  ORDER_CANCEL: 30013,
  REVERSEREPO_ORDER: 30024,
  /** 算法暂停 */
  STOP_ALGO_OPERATE: 30025,
  /** 算法重启 */
  RESTART_ALGO_OPERATE: 30026,
  /** 算法改单 */
  MODIFY_ALGO_OPERATE: 30027,
  /** 风控试算 */
  RISK_PRECALC: 30028,

  /** 减持信息 柜台-功能号
     * // 各接口说明
     // uf20 34110
     // uft  34111
     // uf20机构 34112
     // atp  34103
     */
  REDUCE_HOLD: 34110, // ETOP
  REDUCE_HOLD_34111: 34111, // ETOP
  REDUCE_HOLD_34112: 34112, // ETOP
  REDUCE_HOLD_34103: 34103,

  // REVERSEREPO_MANAGE            : 30023
  // 30024
  //* ************       30023        **************/

  //* **********30000- 39999 交易功能号 请***先选择号段范围****然后****按顺序*****填写  END ***********************

  //* ********** TODO 此处功能号会映射处理  START ***********************

  /** 单个查询系统参数参数值成功 */
  SINGLE_SYS_PARAM: 100047,
  /** 查询系统参数参数值成功 */
  SYS_PARAM: 100046,
  /** 系统状态 */
  SYS_STATUS: 103223,

  //* **********TODO 此处功能号会映射处理  END ***********************

  //* **********40000- 49999 查询管理功能号 请***先选择号段范围****然后****按顺序*****填写  START ***********************
  /** 交易流水明细数据查询 */
  DATAQUERY_DETAILINFO: 44002,
  /** 客户端设置 */
  CLIENT_SETTING: 44006,
  /** 逆回购策略查询 */
  REVERSEREPO_QUERY: 44011,

  /** 机构综合交易平台查询（减持有道-交易执行进展查询） */
  EXEC_PROGRESS_QUERY: 44035,

  /** 安全改造管理和请求 */
  SECURITY_MANAGER: "xxxxxx",
  /** 场外基金开户信息查询 */
  OPEN_INFO_QUERY: 44034,

  /** 账户概览 */
  ACCOUNT_SUMMARY: 44036,

  /** O32账户关系维护 */
  O32_MANAGEMENT_EDIT: 923051,
  O32_MANAGEMENT_QUERY: 923052,

  /** 账户历史持仓查询 */
  QUERY_ACCOUNT_HIS_HOLD: 923058,

  /** 场外基金信息查询 */
  INVESETFUND_QUERY: 44042,
  /** 同步单个柜台产品数据 */
  SINGLE_INVESETFUND_SYNC_FROM_COUNTER: 60504,
  /** 电签查询 */
  NBOP_SIGN: 44101,

  /** 交易流水管理 */
  INVESTTRADE_MANAGER: 44700,
  /** 交易流水查询 */
  INVESTTRADE_QUERY: 44701,

  /** 私募产品自主预约申请提交 */
  RESERVATION_APPLY: 45001,

  //* **********40000- 49999 查询管理功能号 请***先选择号段范围****然后****按顺序*****填写  END ***********************

  //* **********60000- 69999 柜台同步刷新查询功能号 请***先选择号段范围****然后****按顺序*****填写  START ***********************
  /** 资金、持仓、委托、成交数据同步 */
  DATA_SYNC: 60211,
  /** 资金变动流水查询 ETOP */
  FUND_FLOW_QUERY: 60421,
  /** 场外资金交割流水查询 ETOP */
  OUT_FUND_FLOW_QUERY: 60423,
  /** 成交流水查询 */
  MATCH_HISTORY_QUERY: 60408,
  /** 分红方式设置 */
  DIVIDEND_WAY_SET: 60502,
  /** 持仓估值数据查询 */
  HOLD_ValuationData_QUERY: 60413,
  /** 交易估值数据查询 */
  Trade_ValuationData_QUERY: 60412,
  /** 产品中心预约委托查询 */
  RESERVATION_ORDER_QUERY: 60414,
  //* **********60000- 69999 柜台同步刷新查询功能号 请***先选择号段范围****然后****按顺序*****填写  END ***********************

  // 管理端接口
  /** 风控信息接口 */
  RISKINFO_QUERY: 44020,

  /** 账户变动(权益)流水查询接口 */
  ACCOUNTCHAINFO_QUERY: 44008,

  /** 智汇平台绑定用户校验 */
  INSTINFO: 922025,

  /** 多节点接口 */
  QUERY_WORK_FLOW_ONLINE: 980100, // 查询工作流节点消息
  QUERY_PROCESSOR: 980102, // 查询下一处理员信息
  QUERT_WORK_FLOW: 923038, // 查询工作流缓存

  /** 减持有道-标的代码查询 */
  TRADE_SUGGESTION_QUERY: 923039,

  /** 管理中心-场外基金成交回单查询 */
  MATCH_CONFIRM_QUERY: 93952, // 成交回单查询
  MATCH_SUMMARY_URL_QUERY: 44810, // NBOP汇总查询
  MATCH_NBOP_PATH: 926006, // 获取NBOP服务器地址

  /** 管理中心-交易回单查询-开户回单查询 */
  OPEN_ACCOUNT_QUERY_UFT: 34111, // uft  34111 ETOP
  OPEN_ACCOUNT_QUERY_UF_20: 34110, // uf20 34110 ETOP
  OPEN_ACCOUNT_QUERY_ATP: 34103, // atp  34103
  OPEN_ACCOUNT_QUERY_UF20JG: 34112, // uf20机构 34112 ETOP

  /* 产品中心基金分红信息查询 */
  DIVIDEND_QUERY: 44122,
  /* 私募基金协议签署记录查询 */
  FUND_PRIVATE_SIGN_LIST: 44121,
  /* 私募基金补签协议查询 */
  FUND_PRIVATE_SIGN_SUPP: 44120,

  /** 延迟验资白名单查询 */
  VERIFY_FUND_WHITE_LIST_QUERY: 923400,

  /** 查询统计场外基金认购申购指令金额 */
  SINGLE_DAY_LIMIT: 923401,

  /** 查询资产单元资产 */
  ASSET: 923200,

  /** 自助注册 system_id */
  USER_AUTO_REGISTER_SYSTEM: 2803,
  /** 自助注册 interface_id */
  USER_AUTO_REGISTER: 2803005,
  /** 查询工作流日志 */
  FLOW_TYPE_LOG: 980116,

  /** 场外基金指令流水查询 ETOP */
  DATAQUERY_DETAILINFO_INSTR_ETOP: 44903,
  /** 场外基金委托流水查询 ETOP */
  DATAQUERY_DETAILINFO_ORDER_ETOP: 44956,
  /** 基金理财持仓查询 ETOP */
  DATAQUERY_DETAILINFO_HOLD_ETOP: 44955,
};

