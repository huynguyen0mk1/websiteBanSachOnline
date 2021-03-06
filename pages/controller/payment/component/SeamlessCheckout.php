<?php

class SeamlessCheckout
{
    private static function _call($params) {
        $paramsStr = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, NL_ENDPOINT);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $paramsStr);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        $result = curl_exec($ch);
        if (!empty($result)) {
            $str_result = str_replace('&', '&amp;', (string) $result);
            $xml = simplexml_load_string($str_result);
            $json_result = json_encode($xml);
            $result = json_decode($json_result, true);
        }
        return $result;
    }

    public static function setExpressCheckout($params)
    {
        $inputs = array(
            'merchant_id' => MERCHANT_ID,
            'merchant_password' => md5(MERCHANT_PASSWORD),
            'version' => VERSION,
            'function' => 'SetExpressCheckout',
            'receiver_email' => RECEIVER_EMAIL,
            'order_code' => $params['order_code'],
            'total_amount' => $params['total_amount'],
            'payment_method' => $params['payment_method'],
            'payment_type' => $params['payment_type'],
            'order_description' => $params['order_description'],
            'tax_amount' => $params['tax_amount'],
            'discount_amount' => $params['discount_amount'],
            'fee_shipping' => $params['fee_shipping'],
            'bank_code' => $params['bank_code'],
            'return_url' => $params['return_url'],
            'cancel_url' => $params['cancel_url'],
            'notify_url' => $params['notify_url'],
            'time_limit' => $params['time_limit'],
            'buyer_fullname' => $params['buyer_fullname'],
            'buyer_email' => $params['buyer_email'],
            'buyer_mobile' => $params['buyer_mobile'],
            'buyer_address' => $params['buyer_address'],
            'cur_code' => $params['cur_code'],
            'lang_code' => $params['lang_code'],
            'affiliate_code' => $params['affiliate_code'],
            'card_number' => $params['card_number'],
            'card_fullname' => $params['card_fullname'],
            'card_month' => $params['card_month'],
            'card_year' => $params['card_year'],
        );
        $result = static::_call($inputs);
        return $result;
    }

    public static function authenTransaction($params)
    {
        $inputs = array(
            'merchant_id' => MERCHANT_ID,
            'merchant_password' => md5(MERCHANT_PASSWORD),
            'version' => VERSION,
            'function' => 'AuthenTransaction',
            'token' => $params['token'],
            'otp' => $params['otp'],
            'auth_url' => $params['auth_url']
        );
        $result = static::_call($inputs);
        return $result;
    }

    public static function getTransactionDetail($params)
    {
        $inputs = array(
            'merchant_id' => MERCHANT_ID,
            'merchant_password' => md5(MERCHANT_PASSWORD),
            'version' => VERSION,
            'function' => 'GetTransactionDetail',
            'token' => $params['token'],
        );
        $result = static::_call($inputs);
        return $result;
    }

    public static function getRequestField($params)
    {
        $inputs = array(
            'merchant_id' => MERCHANT_ID,
            'merchant_password' => md5(MERCHANT_PASSWORD),
            'version' => VERSION,
            'function' => 'GetRequestField',
            'receiver_email' => RECEIVER_EMAIL,
            'payment_method' => $params['payment_method'],
            'bank_code' => $params['bank_code']
        );
        $result = static::_call($inputs);
        return $result;
    }

    public static function getBanksByPaymentMethod($payment_method)
    {
        switch ($payment_method) {
            case 'ATM_ONLINE':
                $banks = array('AGB', 'BAB', 'BIDV', 'EXB', 'MSB', 'STB', 'SGB', 'NVB', 'PGB', 'GPB', 'ICB', 'TCB',
                    'TPB', 'VAB', 'VIB', 'VCB', 'MB', 'ACB', 'HDB', 'VPB', 'OJB', 'SHB', 'SEA', 'OCB', 'ABB', 'NAB');
                break;
            case 'IB_ONLINE':
                $banks = array('BIDV', 'EXB', 'STB', 'ICB', 'TCB', 'VCB', 'DAB', 'ACB');
                break;
            case 'QRCODE':
                $banks = array('AGB', 'MSB', 'NVB', 'ICB', 'VCB', 'VCBPAY', 'MB', 'VPB', 'SHB', 'OCB', 'ABB', 'SCB',
                    'IVB', 'WCP');
                break;
            case 'CASH_IN_SHOP':
                $banks = array('VIETTELPOST');
                break;
        }
        $bank_info = array();
        foreach ($banks as $bank) {
            $bank_info[$bank] = self::getBankName($bank);
        }
        return $bank_info;
    }

    public static function getBankName($bank_code)
    {
        $list_bank_name = array(
            'AGB' => 'Ng??n h??ng N??ng nghi???p v?? Ph??t tri???n N??ng th??n',
            'BAB' => 'Ng??n h??ng TMCP B???c ??',
            'BIDV' => 'Ng??n h??ng ?????u t?? v?? Ph??t tri???n Vi???t Nam',
            'EXB' => 'Ng??n h??ng TMCP Xu???t Nh???p Kh???u',
            'MSB' => 'Ng??n h??ng TMCP H??ng H???i',
            'STB' => 'Ng??n h??ng TMCP S??i G??n Th????ng T??n',
            'SGB' => 'Ng??n h??ng TMCP  S??i G??n C??ng th????ng',
            'NVB' => 'Ng??n h??ng TMCP Nam Vi???t',
            'PGB' => 'Ng??n h??ng TMCP X??ng D???u Petrolimex',
            'GPB' => 'Ng??n h??ng TMCP D???u Kh??',
            'ICB' => 'Ng??n h??ng TMCP C??ng Th????ng',
            'TCB' => 'Ng??n h??ng TMCP K??? Th????ng',
            'TPB' => 'Ng??n h??ng TMCP Ti??n Phong',
            'VAB' => 'Ng??n h??ng TMCP Vi???t ??',
            'VIB' => 'Ng??n h??ng TMCP Qu???c t???',
            'VCB' => 'Ng??n h??ng TMCP Ngo???i Th????ng Vi???t Nam',
            'VCBPAY' => 'VCBPAY',
            'DAB' => 'Ng??n h??ng TMCP ????ng ??',
            'MB' => 'Ng??n h??ng TMCP Qu??n ?????i',
            'ACB' => 'Ng??n h??ng TMCP ?? Ch??u',
            'HDB' => 'Ng??n h??ng TMCP Ph??t Tri???n Nh?? TP.H??? Ch?? Minh',
            'VPB' => 'Ng??n h??ng TMCP Vi???t Nam Th???nh V?????ng',
            'OJB' => 'Ng??n h??ng TMCP ?????i D????ng',
            'SHB' => 'Ng??n h??ng TMCP S??i G??n - H?? N???i',
            'SEA' => 'Ng??n h??ng TMCP ????ng Nam ??',
            'OCB' => 'Ng??n h??ng Ph????ng ????ng Vi???t Nam',
            'ABB' => 'Ng??n h??ng TMCP An B??nh',
            'NAB' => 'Ng??n h??ng Nam ??',
            'SCB' => 'Ng??n h??ng TMCP S??i G??n',
            'IVB' => 'Ng??n h??ng TNHH Indovina',
            'WCP' => 'WeChat Pay',
            'VIETTELPOST' => 'Viettelpost',
        );
        $bank_name = (array_key_exists($bank_code, $list_bank_name)) ? $list_bank_name[$bank_code] : 'N/A';
        return $bank_name;
    }
}