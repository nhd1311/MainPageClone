 const translations = {
  vi: {
    // Topbar
    topbar: {
      search:   'Xem chi tiết mã',
      totalGtgd:'Tổng GTGD',
      langLabel: 'Tiếng Việt',
      feedback:  'Phản hồi',
      login:     'Đăng nhập',
      darkMode:  'Chuyển giao diện',
      notify:    'Thông báo',
    },

    // Navbar
    nav: {
      priceBoard:  'BẢNG GIÁ',
      marketInfo:  'THÔNG TIN THỊ TRƯỜNG',
      stockTrade:  'GIAO DỊCH CHỨNG KHOÁN',
      moneyTrade:  'GIAO DỊCH TIỀN',
      assetMgmt:   'QUẢN LÝ TÀI SẢN',
      utilities:   'TIỆN ÍCH KHÁC',
      dropdown: {
        // Thông tin thị trường
        marketView:  'Phân tích thị trường',
        liquidity:       'Thanh khoản thị trường',
        marketCap:       'Vốn hóa thị trường',
        foreignTrading:    'Giao dịch khối ngoại',
        news:            'Tin Tức - Sự kiện',
        // Giao dịch chứng khoán
        placeOrder:      'Đặt lệnh',
        putThrough:       'Lệnh thỏa thuận',
        condOrder:       'Lệnh điều kiện',
        orderHistory:    'Lịch sử lệnh',
        confirmOrder:    'Xác nhận lệnh',
        alert:           'Cảnh báo',
        rightInfo:       'Tra cứu thông tin quyền',
        expectedInfo:   'Thông tin quyền dự kiến',
        stockTransfer:   'Chuyển khoản chứng khoán',
        infoRegistration:   'Thực hiện quyền',
        adOrder:         'Lệnh quảng cáo',
        // Giao dịch tiền
        internalTransfer:'Chuyển khoản nội bộ',
        cia:     'Ứng trước tiền bán',
        withdrawReq:     'Yêu cầu rút tiền',
        deposit:         'Nộp tiền vào TKCK',
        // Quản lý tài sản
        portOverview:   'Tổng quan tài sản',
        statement:       'Sao kê giao dịch',
        interestTable:   'Bảng kê tính lãi vay',
        // Tiện ích khác
        signUp:  'Đăng ký dịch vụ trực tuyến',
        manageBankInfo:  'Quản lý thông tin tài khoản ngân hàng',
        manageContract:  'Quản lý Hợp đồng',
        changeMargin:    'Thay đổi hạn mức ký quỹ',
        userGuide:       'Hướng dẫn sử dụng',
        marginList:      'Danh sách CK ký quỹ',
        research:        'Trung tâm nghiên cứu',
        advisory:        'Tư vấn',
        sysSetting:       'Cấu hình hệ thống',
        loginHistory:    'Lịch sử đăng nhập',
        devices:         'Thiết bị kết nối tài khoản',
        // Chung
        settings:        'Cài đặt',
      },
    },

    // TabBar
    tabBar: {
      trade:       'Giao dịch',
      basic:       'Cơ bản',
      watchlist:   'DM theo dõi',
      derivatives: 'Phái sinh',
      sector:      'Nhóm ngành',
      cw:          'Chứng quyền',
      etf:         'ETF HOSE',
      bond:        'Trái phiếu doanh nghiệp',
      collapse:    'Thu gọn',
    },

    // StockBoard header
    stockBoard: {
      bidInfo:     'Thông tin dư mua',
      matchedInfo: 'Khớp lệnh',
      askInfo:     'Thông tin dư bán',
      totalVol:    'Tổng KL',
      price:       'Giá',
      foreign:     'Nhà ĐTNN',
      stock:      'Mã CK',
      ceiling:     'Trần',
      floor:       'Sàn',
      ref:         'TC',
      avg:         'TB',
      low:         'Thấp',
      high:        'Cao',
      open:        'Mở cửa',
      buy:         'Mua',
      sell:        'Bán',
    },

    // IndexTable
    indexTable: {
      mainIndex:   'Chỉ số chính',
      volMil:      'KLGD (Triệu)',
      valBil:      'GTGD (Tỷ)',
      gainLose:      'CK Tăng/Giảm',
      session:     'Phiên',
    },

    // IndexCard
    indexCard: {
      cp:          'CP',
      bil:         'Tỷ',
      openSession: 'Phiên mở cửa',
      contSession: 'Phiên liên tục',
    },

    // BottomBar
    bottomBar: {
      quickOrder: 'Đặt lệnh nhanh',
      orderBook:  'Sổ lệnh',
    },
  },

  en: {
    topbar: {
      search:   'View symbol detail',
      totalGtgd:'Trading matched volume',
      langLabel: 'English',
      feedback:  'Feedback',
      login:     'Login',
      darkMode:  'Toggle theme',
      notify:    'Notifications',
    },

    nav: {
      priceBoard:  'PRICE BOARD',
      marketInfo:  'MARKET INFO',
      stockTrade:  'STOCK TRANSACTIONS',
      moneyTrade:  'CASH TRANSACTIONS',
      assetMgmt:   'PORTFOLIO MANAGEMENT',
      utilities:   'OTHER UTILITIES',
      dropdown: {
        // Market Info
        marketView:  'Market view',
        liquidity:       'Market liquidity',
        marketCap:       'Market cap',
        foreignTrading:    'Foreigner trading',
        news:            'News - Events',
        // Stock Transactions
        placeOrder:      'Place order',
        putThrough:       'Put-through order',
        condOrder:       'Conditional order',
        orderHistory:    'Order history',
        confirmOrder:    'Confirm your order',
        alert:           'Alerts',
        rightInfo:       'Check rights information',
        expectedInfo:   'Expected right on portfolio',
        stockTransfer:   'Internal stock transfer',
        infoRegistration:   'Right information registration',
        adOrder:         'Advertise order',
        // Cash Transactions
        internalTransfer:'Internal transfer',
        cia:     'Cash in advance (CIA)',
        withdrawReq:     'Withdrawal request',
        deposit:         'Deposit money into securities account',
        // Portfolio Management
        portOverview:   'Portfolio overview',
        statement:       'Statement',
        interestTable:   'Statement of margin loan interest',
        // Other Utilities
        signUp:  'Sign up for online service',
        manageBankInfo:  'Bank account management',
        manageContract:  'Contract Management',
        changeMargin:    'Change margin limit',
        userGuide:       'User guide',
        marginList:      'Margin stock list',
        research:        'Research center',
        advisory:        'Advisory',
        sysSetting:       'System settings',
        loginHistory:    'Login History',
        devices:         'Account connection devices',
        // Common
        settings:        'Settings',
      },
    },

    tabBar: {
      trade:       'Trade',
      basic:       'Basic',
      watchlist:   'Watchlist',
      derivatives: 'Derivatives',
      sector:      'Sector',
      cw:          'Covered Warrants',
      etf:         'ETF',
      bond:        'Corporate Bonds',
      collapse:    'Collapse',
    },

    stockBoard: {
      bidInfo:     'Bid',
      matchedInfo: 'Matched Quantity',
      askInfo:     'Ask',
      totalVol:    'Total Vol',
      price:       'Price',
      foreign:     'Foreign',
      stock:      'Stock',
      ceiling:     'CE',
      floor:       'FL',
      ref:         'Ref',
      avg:         'Avg',
      low:         'Low',
      high:        'High',
      open:        'Open',
      buy:         'Buy',
      sell:        'Sell',
    },

    indexTable: {
      mainIndex:   'Main Indexes',
      volMil:      'Vol (Mil)',
      valBil:      'Value (Bil)',
      gainLose:    'Gainers/Losers',
      session:     'Session',
    },

    indexCard: {
      cp:          'Shares',
      bil:         'Billion',
      openSession: 'Opening session',
      contSession: 'Continuous session',
    },

    bottomBar: {
      quickOrder: 'Quick Order',
      orderBook:  'Order Book',
    },
  },
};

export default translations;
