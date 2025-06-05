import React, {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './index.module.scss';
import http from "@http";
import Card from "@components/CardComponent/index.jsx";

gsap.registerPlugin(ScrollTrigger);

// 修改组件接收filterTags作为props
const DiagonalScrollAnimation = ({ filterTags = [] }) => {
    const rootRef = useRef(null);
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    
    // 获取数据并排序
    useEffect(() => {
      http.get('/article/all')
        .then(res => {
          // 对数据进行排序
          const sortedItems = sortItemsByTimeline(res);
          setItems(sortedItems);
          console.log('sorted res', sortedItems);
        })
        .catch(err => {
          console.error('请求出错:', err);
        });
    }, []);

    // 时间轴排序函数
    const sortItemsByTimeline = (items) => {
      if (!items || !Array.isArray(items)) return [];
      
      // 辅助函数：获取项目的时间值用于排序
      const getTimeValue = (item) => {
        // 如果有具体年份
        if (item.startYear !== null) {
          return item.startYear + (item.startMonth ? item.startMonth / 12 : 0);
        }
        
        // 如果只有年代信息，转换为对应的时间值
        if (item.era && item.era !== 'null') {
          // 将年代转换为大致年份（例如：90s -> 1990）
          const eraNum = parseInt(item.era);
          if (!isNaN(eraNum)) {
            return eraNum;
          }
        }
        
        // 如果没有时间信息，返回一个很大的值，排在最后
        return 9999;
      };
      
      return [...items].sort((a, b) => {
        // 获取两个项目的时间值
        const aTimeValue = getTimeValue(a);
        const bTimeValue = getTimeValue(b);
        
        // 如果时间值相差不大（认为是同一时期）
        if (Math.abs(aTimeValue - bTimeValue) < 5) { // 5年内视为同一时期
          // 优先级：年代 > 具体年份
          const aHasEra = a.era && a.era !== 'null';
          const bHasEra = b.era && b.era !== 'null';
          
          if (aHasEra && !bHasEra) return -1; // a有年代信息，b没有，a排前面
          if (!aHasEra && bHasEra) return 1;  // b有年代信息，a没有，b排前面
        }
        
        // 不是同一时期或者同为年代/同为具体年份，按时间值排序
        return aTimeValue - bTimeValue;
      });
    };

    // 处理时间显示，确保同一年代只显示一次
    const processTimeDisplay = () => {
      if (!items || items.length === 0) return [];
      
      const displayedEras = new Set();
      const displayedYears = new Set();
      
      return items.map(item => {
        let timeDisplay = '';
        
        // 处理年代信息
        if (item.era && item.era !== 'null') {
          if (!displayedEras.has(item.era)) {
            displayedEras.add(item.era);
            timeDisplay = item.era;
          }
        }
        // 处理年份信息
        else if (item.startYear) {
          const yearKey = `${item.startYear}`;
          if (!displayedYears.has(yearKey)) {
            displayedYears.add(yearKey);
            timeDisplay = yearKey;
          }
        }
        
        return {
          ...item,
          timeDisplay
        };
      });
    };
    
    // 处理后的数据，包含时间显示信息
    const processedItems = processTimeDisplay();

    // 修改函数：检查项目是否包含筛选的tag
    const hasFilteredTag = (item) => {
      // 如果没有设置筛选标签，则所有项目都正常显示
      if (!filterTags || filterTags.length === 0) return true;
      
      // 如果项目没有标签，则不匹配
      if (!item.tags || item.tags.length === 0) return false;
      
      // 检查项目的标签是否包含筛选标签中的任意一个
      return item.tags.some(tag => filterTags.includes(tag.name));
    };

    const elementData = useRef([]);

    useEffect(() => {
        if (!rootRef.current) {
            console.warn('DiagonalScrollAnimation: rootRef.current is null');
            return;
        }
        
        // 使用正确的选择器
        const boxes = gsap.utils.toArray(rootRef.current.querySelectorAll('.box'));
        // 检查是否找到了元素
        if (!boxes || boxes.length === 0) {
            console.warn('DiagonalScrollAnimation: No .box elements found');
            return;
        }
        
        // 清除之前的动画
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        // 设置元素间距
        const spacingX = 60; // 水平间距
        const spacingY = 15;  // 垂直间距 - 设置为水平间距的1/4
        const skewAngle = 20; // 倾斜角度，负值使右边低左边高

        const baseHeight = window.innerHeight; // 基础高度至少为一个屏幕高度
        const heightPerElement = 30; // 每个元素贡献的额外高度
        const containerHeight = baseHeight + (boxes.length * heightPerElement);
        
        // 设置容器高度
        rootRef.current.style.height = `${containerHeight}px`;
        
        // 存储事件处理函数的引用，以便在清理时使用
        const mouseEnterHandlers = [];
        const mouseLeaveHandlers = [];
        
        // 初始化elementData数组
        elementData.current = new Array(boxes.length);

        
        // 为每个元素设置初始位置和动画
        boxes.forEach((box, index) => {
            elementData.current[index] = {
                startY: -index * spacingY,
                endY: ((boxes.length - 1) - index) * spacingY,
                currentY: 0,
                hoverOffset: 0
            };
            
            gsap.set(box, {
                position: 'fixed',
                left: '50%',
                top: 'calc(50% + 20px)', // 修改这里，添加20px偏移
                xPercent: -50,
                yPercent: -50,
                zIndex: boxes.length - index,
                backfaceVisibility: 'hidden',
                skewY: skewAngle,
            });
            
            const tween = gsap.fromTo(box,
                {
                    x: index * spacingX,
                    y: elementData.current[index].startY,
                    scale: 1,
                },
                {
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.3,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const startY = elementData.current[index].startY;
                            const endY = elementData.current[index].endY;
                            const currentY = startY + (endY - startY) * progress;
                            elementData.current[index].currentY = currentY;
                            gsap.set(box, {
                                y: currentY,
                                skewY: skewAngle
                            });
                        }
                    },
                    x: -((boxes.length - 1) - index) * spacingX,
                    y: elementData.current[index].endY,
                    ease: "none",
                }
            );
            elementData.current[index].scrollTrigger = tween.scrollTrigger;
        });

        const hasFilterCondition = filterTags && filterTags.length > 0;

        // 只为匹配的元素添加鼠标事件
        boxes.forEach((item, index) => {
            // 检查元素是否被选中（没有dimmed类）
            const isDimmed = hasFilterCondition && item.classList.contains('dimmed');
            
            if (!isDimmed) {
                const mouseEnterHandler = () => {
                    const scrollProgress = elementData.current[index].scrollTrigger ?
                    elementData.current[index].scrollTrigger.progress : 0;
                    const startY = elementData.current[index].startY;
                    const endY = elementData.current[index].endY;
                    const currentY = startY + (endY - startY) * scrollProgress;
                    elementData.current[index].currentY = currentY;
                    gsap.to(item, {
                        y: currentY - 100,
                        skewY: skewAngle,
                        duration: 0.3,
                        ease: 'power1.inOut'
                    });
                };
                const mouseLeaveHandler = () => {
                    const scrollProgress = elementData.current[index].scrollTrigger ?
                    elementData.current[index].scrollTrigger.progress : 0;
                    const startY = elementData.current[index].startY;
                    const endY = elementData.current[index].endY;
                    const currentY = startY + (endY - startY) * scrollProgress;
                    elementData.current[index].currentY = currentY;
                    gsap.to(item, {
                        y: currentY,
                        skewY: skewAngle,
                        duration: 0.3,
                        ease: 'power1.inOut'
                    });
                };
                item.addEventListener('mouseenter', mouseEnterHandler);
                item.addEventListener('mouseleave', mouseLeaveHandler);
                mouseEnterHandlers[index] = mouseEnterHandler;
                mouseLeaveHandlers[index] = mouseLeaveHandler;
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            
            if (rootRef.current) {
                const boxes = gsap.utils.toArray(rootRef.current.querySelectorAll('.box'));
                boxes.forEach((box, index) => {
                    if (box) {
                        // 使用存储的处理函数引用移除事件监听器
                        if (mouseEnterHandlers[index]) {
                            box.removeEventListener('mouseenter', mouseEnterHandlers[index]);
                        }
                        if (mouseLeaveHandlers[index]) {
                            box.removeEventListener('mouseleave', mouseLeaveHandlers[index]);
                        }
                    }
                });
            }
        };
    }, [items, filterTags]); // 依赖 items 和 filterTags，数据或筛选条件变化后重新初始化动画

    const hasFilterCondition = filterTags && filterTags.length > 0;

    return (
        <div className={styles.root} ref={rootRef}>
            {processedItems.map((item, idx) => {
              // 检查是否匹配筛选条件
              const isMatched = hasFilteredTag(item);
              
              return (
                <div className="card" key={item.id || idx}>
                  <div className={`box ${hasFilterCondition ? (isMatched ? 'matched' : 'dimmed') : ''}`}>
                    <Card
                      className="item"
                      location={item.location}
                      tag1={item.tags && item.tags.length > 0 ? item.tags[0].name : ''}
                      tag2={item.tags && item.tags.length > 1 ? item.tags[1].name : ''}
                    />
                    <div className="time">
                      <div className='timeText'>{item.timeDisplay}</div>
                      {item.timeDisplay === '' ? null :<div className='line'></div>}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
    );
};

export default DiagonalScrollAnimation;