import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Space, Select, Upload, message, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import styles from './index.module.scss';
import axios from 'axios';

const App = () => {
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const { Link } = Typography;
    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button" className='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const { TextArea } = Input;

    const cityData = {
        直辖: ['北京', '上海', '天津', '重庆'],
        河北: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
        山西: ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
        内蒙古: ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
        辽宁: ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
        吉林: ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
        黑龙江: ['哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '大兴安岭地区'],
        江苏: ['南京', '无锡', '徐州', '常州', '苏州', '南通', '连云港', '淮安', '盐城', '扬州', '镇江', '泰州', '宿迁'],
        浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
        安徽: ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '六安', '亳州', '池州', '宣城'],
        福建: ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
        江西: ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
        山东: ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '临沂', '德州', '聊城', '滨州', '菏泽'],
        河南: ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '济源'],
        湖北: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '潜江', '天门', '神农架林区'],
        湖南: ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
        广东: ['广州', '韶关', '深圳', '珠海', '汕头', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
        广西: ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
        海南: ['海口', '三亚', '三沙', '儋州'],
        四川: ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
        贵州: ['贵阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
        云南: ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
        西藏: ['拉萨', '日喀则', '昌都', '林芝', '山南', '那曲', '阿里地区'],
        陕西: ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
        甘肃: ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
        青海: ['西宁', '海东', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
        宁夏: ['银川', '石嘴山', '吴忠', '固原', '中卫'],
        新疆: ['乌鲁木齐', '克拉玛依', '吐鲁番', '哈密', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子', '阿拉尔', '图木舒克', '五家渠', '北屯', '铁门关', '双河', '可克达拉', '昆玉', '胡杨河'],
        香港: ['香港'],
        澳门: ['澳门'],
        台湾: ['台北', '高雄', '台中', '台南', '基隆', '新竹', '嘉义', '新北', '桃园', '彰化县', '屏东县', '云林县', '苗栗县', '南投县', '花莲县', '台东县', '宜兰县', '澎湖县']
    };

    const provinceData = [
        '直辖', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南',
        '广东', '广西', '海南', '四川', '贵州', '云南', '西藏',
        '陕西', '甘肃', '青海', '宁夏', '新疆', '香港',
        '澳门', '台湾', '未知', '其他'
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasSelf, setHasSelf] = useState(false);
    const [formData, setFormData] = useState({
        nameNew: '',
        gender: null,
        province: provinceData[0],
        city: cityData[provinceData[0]][0],
        township: '',
        birthdate: null,
        introNew: '',
        avatarNew: '',
        relationName: null
    });

    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);

    const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 1900 + i);
    const yearOptions = years.map(y => ({ label: y.toString(), value: y }));

    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
        label: m.toString().padStart(2, '0'),
        value: m
    }));

    const getDayOptions = (selectedYear, selectedMonth) => {
        let maxDays = 31;
        if (selectedMonth) {
            const isLeapYear = selectedYear && (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || (selectedYear % 400 === 0);
            if ([4, 6, 9, 11].includes(selectedMonth)) maxDays = 30;
            else if (selectedMonth === 2) maxDays = isLeapYear ? 29 : 28;
        }
        return Array.from({ length: maxDays }, (_, i) => i + 1).map(d => ({
            label: d.toString().padStart(2, '0'),
            value: d
        }));
    };


    const relationOptions = [
        { label: '父亲', value: '父亲' },
        { label: '母亲', value: '母亲' },
        { label: '祖父', value: '祖父' },
        { label: '祖母', value: '祖母' },
        { label: '伯父', value: '伯父' },
        { label: '叔父', value: '叔父' },
        { label: '堂兄弟', value: '堂兄弟' },
        { label: '舅舅', value: '舅舅' },
        { label: '姨妈', value: '姨妈' },
        { label: '表兄弟', value: '表兄弟' },
        { label: '兄弟', value: '兄弟' },
        { label: '姐妹', value: '姐妹' },
        { label: '儿子', value: '儿子' },
        { label: '女儿', value: '女儿' },
        { label: '孙子', value: '孙子' },
        { label: '孙女', value: '孙女' },
        { label: '侄子', value: '侄子' },
        { label: '侄女', value: '侄女' }
    ];

    useEffect(() => {
    const fetchTellers = async () => {
        try {
            const token = localStorage.getItem('token'); // 从本地存储获取 token
            const response = await axios.get('/teller/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.code === 0) {
                const tellers = response.data.data || [];
                const hasSelfTeller = tellers.some(teller => teller.identity === '我自己');
                setHasSelf(hasSelfTeller);
            }
        } catch (error) {
            message.error('获取讲述者列表失败：' + (error.response?.data?.message || error.message));
        }
    };

    fetchTellers();
}, []);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!formData.nameNew) {
            message.error('请填写真实姓名！');
            return;
        }
        if (!formData.gender) {
            message.error('请选择性别！');
            return;
        }
        if (!year || !month || !day) {
            message.error('请选择完整的出生日期！');
            return;
        }
        if (!formData.introNew) {
            message.error('请填写简介！');
            return;
        }
        if (!formData.avatarNew) {
            message.error('请上传头像！');
            return;
        }
        if (hasSelf && !formData.relationName) {
            message.error('请选择亲属关系！');
            return;
        }

        const birthdate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const birthplace = formData.township ? `${formData.province} ${formData.city} ${formData.township}` : `${formData.province} ${formData.city}`;
        if(!hasSelf) formData.relationName = "我自己"
        const requestData = {
            nameNew: formData.nameNew,
            gender: formData.gender,
            birthplace,
            birthdate,
            introNew: formData.introNew,
            avatarNew: formData.avatarNew,
            relationName: formData.relationName
        };

        try {
    const token = localStorage.getItem('token'); // 假设你将 token 存在 localStorage

    const response = await axios.post(
        '/teller',
        requestData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.data.code === 0) {
        message.success('讲述者创建成功！');
        setIsModalOpen(false);
        setFormData({
            nameNew: '',
            gender: null,
            province: provinceData[0],
            city: cityData[provinceData[0]][0],
            township: '',
            birthdate: null,
            introNew: '',
            avatarNew: '',
            relationName: null
        });
        setYear(null);
        setMonth(null);
        setDay(null);
        setImageUrl(null);

        const tellersResponse = await axios.get(
            `/teller?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (tellersResponse.data.code === 0) {
            const tellers = tellersResponse.data.data || [];
            const hasSelfTeller = tellers.some(teller => teller.identity === '我自己');
            setHasSelf(hasSelfTeller);
        }
    } else {
        message.error(response.data.message || '创建失败！');
    }
} catch (error) {
    message.error('创建失败：' + (error.response?.data?.message || error.message));
}};

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({
            nameNew: '',
            gender: null,
            province: provinceData[0],
            city: cityData[provinceData[0]][0],
            township: '',
            birthdate: null,
            introNew: '',
            avatarNew: '',
            relationName: null
        });
        setYear(null);
        setMonth(null);
        setDay(null);
        setImageUrl(null);
    };

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, url => {
                setLoading(false);
                setImageUrl(url);
            });
            const response = info.file.response;
            if (response && response.code === 0 && response.data) {
                setFormData(prev => ({ ...prev, avatarNew: response.data }));
            } else {
                message.error(response?.message || '头像上传失败！');
            }
        } else if (info.file.status === 'error') {
            setLoading(false);
            message.error('头像上传失败！');
        }
    };

    const handleProvinceChange = value => {
        setFormData(prev => ({ ...prev, province: value, city: cityData[value][0] }));
    };

    const onSecondCityChange = value => {
        setFormData(prev => ({ ...prev, city: value }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTownshipChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, township: value }));
    };

    const identityField = hasSelf ? (
        <Space>
            <Input value="我自己" className='input' size='small' disabled />
            <p>的</p>
            <Select
                className='select'
                value={formData.relationName}
                onChange={value => handleInputChange('relationName', value)}
                options={relationOptions}
                placeholder="亲属关系"
                style={{ width: 120 }}
            />
        </Space>
    ) : (
        <Input value="我自己" disabled />
    );

    return (
        <>
            <Button type="primary" onClick={showModal}>
                创建讲述者
            </Button>

            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} className={styles.root} footer={[
                <Button key="upload" type="primary" onClick={handleOk}>
                    上传
                </Button>
            ]}>
                <div className="modal-content">
                    <Flex gap="middle" align="flex-start" className="content-wrapper">
                        <div className='right'>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                style={{ width: '150px', height: '150px' }}
                                showUploadList={false}
                                action="/upload"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
                            </Upload>
                            <p className='avatar-reminder'>上传头像</p>
                            <p>一条说明：鼓励用户上传真实照片</p>
                        </div>

                        <div className='left'>
                            <Space className='space'>
                                <p className='word'>讲述者身份</p>
                                {identityField}
                            </Space>

                            <Space className='space'>
                                <p className='word'>真实姓名</p>
                                <Input value={formData.nameNew} onChange={e => handleInputChange('nameNew', e.target.value)} />
                            </Space>
                            <Space className='space'>
                                <p className='word'>性别</p>
                                <Select className='select' value={formData.gender} onChange={value => handleInputChange('gender', value)} options={[
                                    { value: '男', label: '男' },
                                    { value: '女', label: '女' }
                                ]} />
                            </Space>
                            <Space className='space'>
                                <p className='word'>出生地</p>
                                <Select className='select' value={formData.province} onChange={handleProvinceChange} options={provinceData.map(province => ({ label: province, value: province }))} />
                                <p className='unit'>省</p>
                                <Select className='select' value={formData.city} onChange={onSecondCityChange} options={cityData[formData.province].map(city => ({ label: city, value: city }))} />
                                <p className='unit'>市</p>
                                <Input placeholder='乡（选填）' className='input' size='small' value={formData.township} onChange={handleTownshipChange} />
                                <p className='unit'>乡</p>
                            </Space>
                            <Space className='space birthdate-space'>
                                <p className='word'>出生日期</p>
                                <Select className='select' style={{ width: 100 }} value={year} onChange={value => setYear(value)} placeholder="年" options={yearOptions} />
                                <p className='unit'>年</p>
                                <Select className='select' style={{ width: 80 }} value={month} onChange={value => setMonth(value)} placeholder="月" options={monthOptions} />
                                <p className='unit'>月</p>
                                <Select className='select' style={{ width: 80 }} value={day} onChange={value => setDay(value)} placeholder="日" options={getDayOptions(year, month)} />
                                <p className='unit'>日</p>
                            </Space>
                            <Link href="https://gonglinongli.bmcx.com/" target="_blank">农历阴历转换器</Link>
                            <Space className='space'>
                                <p className='word'>简介</p>
                                <TextArea rows={2} maxLength={300} showCount value={formData.introNew} onChange={e => handleInputChange('introNew', e.target.value)} />
                            </Space>
                        </div>
                    </Flex>
                </div>
            </Modal>
        </>
    );
};

export default App;