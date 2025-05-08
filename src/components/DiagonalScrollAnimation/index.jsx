import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './index.module.scss';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

const DiagonalScrollAnimation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const boxCount = 30; // 减少元素数量以提高性能
    const spacing = 60; // 基础间距

    // 计算屏幕尺寸和对角线方向
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // 使用从左下到右上的对角线
    const diagonalAngle = Math.atan2(-screenHeight, screenWidth);

    // 定义缩放范围
    const maxScale = 1.1;  // 左侧最大缩放
    const minScale = 0.9;  // 右侧最小缩放

    // 定义透视效果的倾斜角度（度数）
    const skewAngle = 10; // 正值使右边向下倾斜，负值使右边向上倾斜

    // 定义悬停效果的放大倍数
    const hoverTargetScale = 2;     // 悬停元素放大倍数
    const hoverRightAdjacentScale = 1; // 右侧相邻元素放大倍数
    const hoverLeftAdjacentScale = 1;  // 左侧相邻元素保持原大小
    const hoverLeftSpacingFactor = 1.5; // 左侧间距放大倍数
    const hoverRightSpacingFactor = 2;  // 右侧间距放大倍数

    // 点击元素效果的参数
    const clickedScale = 3.5;       // 点击元素的放大倍数
    const queueOffsetY = 500;       // 队列垂直偏移量
    const queueOffsetX = 800;       // 队列水平偏移量

    // 当前选中的元素索引
    let selectedIndex = -1;
    let isElementSelected = false;

    // 创建主时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: 0.5, // 平滑滚动
        start: "top top", // 修改为页面顶部触发
        end: "bottom bottom", // 页面底部结束
        invalidateOnRefresh: true, // 窗口大小改变时重新计算
      }
    });

    // 清空容器
    container.innerHTML = '';

    // 预先创建所有元素
    const boxes = Array.from({ length: boxCount }).map((_, i) => {
      const box = document.createElement('div');
      box.className = styles.box;
      box.dataset.index = i; // 添加索引标识
      // 使用底部中心作为变换原点，保持一致性
      gsap.set(box, {
        transformOrigin: "center bottom",
        skewY: `${skewAngle}deg` // 添加倾斜变换，实现平行四边形效果
      });
      container.appendChild(box);
      return box;
    });

    // 当前悬停的元素索引
    let currentHoverIndex = -1;

    // 计算对角线基础参数
    const diagonalLength = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
    const segmentLength = diagonalLength / (boxCount * 0.5); // 增大间距系数，使元素间隔更大

    // 设置初始状态和动画
    boxes.forEach((box, i) => {
      // 计算在对角线上的位置（从中心开始，右上方向延伸）
      const distanceFromCenter = i * segmentLength;

      
      // 计算屏幕中心点
      const centerX = screenWidth / 2;
      const centerY = screenHeight / 2;
      
      // 从屏幕中心开始计算初始位置
      const initialX = centerX + Math.cos(diagonalAngle) * distanceFromCenter;
      const initialY = centerY + Math.sin(diagonalAngle) * distanceFromCenter;
      
      // 计算动画终点 - 所有元素向左下方移动
      const moveDistance = (boxCount - 1) * segmentLength;
      
      // 计算终点位置（向左下方移动）
      const targetX = initialX - Math.cos(diagonalAngle) * moveDistance;
      const targetY = initialY - Math.sin(diagonalAngle) * moveDistance;
      
      // 存储元素的原始位置信息和目标位置
      box.originalX = initialX;
      box.originalY = initialY;
      box.targetX = targetX;
      box.targetY = targetY;
      box.originalDistance = distanceFromCenter;
      
      // 计算当前应该的缩放比例
      const screenPosRatio = (targetX + screenWidth/2) / screenWidth;
      const finalScale = maxScale - Math.min(1, Math.max(0, screenPosRatio)) * (maxScale - minScale);
      
      // 设置初始状态 - 直接使用最终位置和缩放比例
      gsap.set(box, {
        x: targetX,
        y: targetY,
        z: 0,
        scale: finalScale,
        opacity: 0.7 - screenPosRatio * 0.2,
        zIndex: Math.round(1000 - screenPosRatio * 1000),
        force3D: true,
        willChange: "transform",
        skewY: `${skewAngle}deg` // 确保设置倾斜角度
      });
      
      // 保存当前位置和比例
      box.currentX = targetX;
      box.currentY = targetY;
      box.baseScale = finalScale;
      
      // 添加到主时间线 - 从最终位置到初始位置的动画（反向）
      tl.to(box, {
        x: initialX,
        y: initialY,
        ease: "none", // 使用线性缓动确保匀速移动
        onUpdate: function() {
          // 只在此元素更新时计算缩放和z-index
          if (this.targets()[0] === box) {
            // 获取当前X位置
            const currentX = gsap.getProperty(box, "x");
            
            // 基于X坐标在屏幕宽度范围内的相对位置计算缩放
            const screenPosRatio = (currentX + screenWidth/2) / screenWidth;
            const newScale = maxScale - Math.min(1, Math.max(0, screenPosRatio)) * (maxScale - minScale);
            
            // 保存当前位置和比例
            box.currentX = currentX;
            box.currentY = gsap.getProperty(box, "y");
            box.baseScale = newScale;
            
            // 应用缩放
            gsap.set(box, {
              scale: newScale,
              opacity: 0.7 - screenPosRatio * 0.2,
              zIndex: Math.round(1000 - screenPosRatio * 1000)
            });
          }
        }
      }, 0); // 所有元素同时移动
      
      // 添加鼠标悬停事件
      box.addEventListener('mouseenter', () => {
        if (!isElementSelected) { // 只有在没有选中元素时才触发悬停效果
          const index = parseInt(box.dataset.index);
          currentHoverIndex = index;
          updateHoverEffect();
        }
      });
      
      box.addEventListener('mouseleave', () => {
        if (!isElementSelected) { // 只有在没有选中元素时才触发悬停效果结束
          currentHoverIndex = -1;
          updateHoverEffect();
        }
      });
      
      // 添加点击事件
      box.addEventListener('click', () => {
        const index = parseInt(box.dataset.index);
        
        if (!isElementSelected) {
          // 只有在没有选中元素时才可以选中新元素
          isElementSelected = true;
          selectedIndex = index;
          updateSelectedElement();
        }
      });
    });

    // 更新悬停效果
    function updateHoverEffect() {
      boxes.forEach((box, i) => {
        if (currentHoverIndex === -1) {
          // 鼠标移出，恢复原始位置和比例
          gsap.to(box, {
            x: box.currentX,
            y: box.currentY,
            scale: box.baseScale,
            skewY: `${skewAngle}deg`, // 恢复原始倾斜角度
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "center bottom", // 保持与悬停状态相同的变换原点
            zIndex: Math.round(1000 - ((box.currentX + screenWidth/2) / screenWidth) * 1000)
          });
        } else {
          // 计算与悬停元素的距离
          const distance = Math.abs(i - currentHoverIndex);
          
          // 设置放大比例
          let scaleMultiplier = 1;
          
          if (distance === 0) {
            // 鼠标悬停的元素
            scaleMultiplier = hoverTargetScale;
          } else if (distance === 1) {
            // 相邻元素 - 不调整图层
            if (i > currentHoverIndex) {
              // 右侧相邻元素 (x+1)
              scaleMultiplier = hoverRightAdjacentScale;
            } else {
              // 左侧相邻元素 (x-1)
              scaleMultiplier = hoverLeftAdjacentScale;
            }
          }
          
          // 计算位置调整
          let xOffset = 0;
          
          // 调整逻辑：只在相邻元素和悬停元素之间增加间距，其他元素随相邻元素移动
          if (i > currentHoverIndex) {
            // 右侧所有元素向右移动相同距离
            const additionalSpacing = (hoverRightSpacingFactor - 1) * segmentLength * Math.cos(diagonalAngle);
            xOffset = additionalSpacing;
          } else if (i < currentHoverIndex) {
            // 左侧所有元素向左移动相同距离
            const additionalSpacing = (hoverLeftSpacingFactor - 1) * segmentLength * Math.cos(diagonalAngle);
            xOffset = -additionalSpacing;
          }
          
          // 对于所有元素，我们使用相同的变换原点，这样可以避免垂直方向的移动
          gsap.to(box, {
            x: box.currentX + xOffset,
            y: box.currentY, // 保持y坐标不变
            scale: box.baseScale * scaleMultiplier,
            skewY: `${skewAngle}deg`, // 保持倾斜角度不变
            transformOrigin: "center bottom", // 统一使用底部中心作为变换原点
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }

    // 更新选中元素效果
    function updateSelectedElement() {
      // 创建一个半透明背景覆盖层
      if (!document.getElementById('overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // 增加背景暗度
        overlay.style.zIndex = '500';
        overlay.style.opacity = '0';
        document.body.appendChild(overlay);
        
        // 点击背景关闭选中状态
        overlay.addEventListener('click', () => {
          isElementSelected = false;
          selectedIndex = -1;
          resetElementPositions();
        });
        
        // 淡入背景
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5
        });
      }
      
      // 计算选中元素应该放大到多大才能占据屏幕的80%
      const selectedBox = boxes[selectedIndex];
      const boxWidth = 260; // 元素的原始宽度
      const boxHeight = 180; // 元素的原始高度
      
      // 计算需要的缩放比例以占据屏幕宽度的80%
      const targetWidthScale = (screenWidth * 0.8) / boxWidth;
      // 计算需要的缩放比例以占据屏幕高度的80%
      const targetHeightScale = (screenHeight * 0.8) / boxHeight;
      
      // 使用较小的缩放比例，确保元素完全在屏幕内
      const calculatedScale = Math.min(targetWidthScale, targetHeightScale);
      
      boxes.forEach((box, i) => {
        let targetX, targetY, targetScale, targetSkew, targetZIndex, targetOpacity;
        
        if (i === selectedIndex) {
          // 选中的元素移动到屏幕中央，变成标准长方形，占据屏幕80%
          targetX = 0;
          targetY = 0;
          targetScale = calculatedScale; // 使用计算出的缩放比例
          targetSkew = 0; // 移除倾斜效果
          targetZIndex = 1000;
          targetOpacity = 1;
        } else if (i < selectedIndex) {
          // 选中元素左边的元素往左下角退
          const distanceFactor = Math.pow(1.2, selectedIndex - i); // 距离越远，偏移越大
          targetX = -queueOffsetX * distanceFactor;
          targetY = queueOffsetY * distanceFactor; // 正值使元素向下移动
          targetScale = box.baseScale * 0.6;
          targetSkew = skewAngle;
          targetZIndex = 100 - (selectedIndex - i); // 越远的元素z-index越小
          targetOpacity = 0.3;
        } else {
          // 选中元素右边的元素往右上角退
          const distanceFactor = Math.pow(1.2, i - selectedIndex); // 距离越远，偏移越大
          targetX = queueOffsetX * distanceFactor;
          targetY = -queueOffsetY * distanceFactor; // 负值使元素向上移动
          targetScale = box.baseScale * 0.6;
          targetSkew = skewAngle;
          targetZIndex = 100 - (i - selectedIndex); // 越远的元素z-index越小
          targetOpacity = 0.3;
        }
        
        // 对于选中的元素，使用绝对定位确保居中
        if (i === selectedIndex) {
          gsap.to(box, {
            x: targetX,
            y: targetY,
            xPercent: -50, // 使元素水平居中
            yPercent: -50, // 使元素垂直居中
            scale: targetScale,
            skewY: `${targetSkew}deg`,
            zIndex: targetZIndex,
            opacity: targetOpacity,
            transformOrigin: "center center", // 选中时使用中心作为变换原点
            duration: 0.7, // 增加动画时间，使过渡更平滑
            ease: "power3.out" // 使用更平滑的缓动函数
          });
        } else {
          gsap.to(box, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            skewY: `${targetSkew}deg`,
            zIndex: targetZIndex,
            opacity: targetOpacity,
            transformOrigin: "center center", // 选中时使用中心作为变换原点
            duration: 0.7, // 增加动画时间，使过渡更平滑
            ease: "power3.out" // 使用更平滑的缓动函数
          });
        }
      });
    }

    // 重置元素位置
    function resetElementPositions() {
      // 移除背景覆盖层
      const overlay = document.getElementById('overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            overlay.remove();
          }
        });
      }
      
      // 获取当前滚动进度，确保有效
      let scrollProgress = 0;
      const scrollTriggers = ScrollTrigger.getAll();
      if (scrollTriggers && scrollTriggers.length > 0 && scrollTriggers[0].progress !== undefined) {
        scrollProgress = scrollTriggers[0].progress;
      }
      
      // 先重置所有元素的基本属性，确保清除选中状态的特殊设置
      boxes.forEach((box) => {
        gsap.set(box, {
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center bottom",
          skewY: `${skewAngle}deg`, // 确保正确设置倾斜角度
          clearProps: "xPercent,yPercent"
        });
      });
      
      // 重置选中状态变量，确保在动画开始前就清除状态
      const previousSelectedIndex = selectedIndex;
      selectedIndex = -1;
      isElementSelected = false;
      
      // 保存当前滚动位置，以便在重置后恢复
      const currentScrollY = window.scrollY;
      
      // 然后为每个元素设置正确的位置和形状
      boxes.forEach((box, i) => {
        // 计算元素应该在的位置，基于初始位置、目标位置和当前滚动进度
        const currentX = box.targetX + (box.originalX - box.targetX) * scrollProgress;
        const currentY = box.targetY + (box.originalY - box.targetY) * scrollProgress;
        
        // 更新保存的当前位置
        box.currentX = currentX;
        box.currentY = currentY;
        
        // 计算当前应该的缩放比例
        const screenPosRatio = (currentX + screenWidth/2) / screenWidth;
        const currentScale = maxScale - Math.min(1, Math.max(0, screenPosRatio)) * (maxScale - minScale);
        box.baseScale = currentScale;
        
        // 直接设置最终位置和形状，不使用两步动画
        gsap.to(box, {
          x: currentX,
          y: currentY,
          scale: currentScale,
          opacity: 0.7 - screenPosRatio * 0.2,
          zIndex: Math.round(1000 - screenPosRatio * 1000),
          skewY: `${skewAngle}deg`, // 确保正确设置倾斜角度
          transformOrigin: "center bottom", // 确保正确设置变换原点
          duration: 0.5,
          ease: "power2.out",
          onComplete: function() {
            // 确保滚动位置不变
            window.scrollTo(0, currentScrollY);
          }
        });
      });
      
      // 确保滚动位置不变
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
      }, 100);
    }

    // 清理函数
    return () => {
      // 清理所有ScrollTrigger实例
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // 移除overlay元素
      const overlay = document.getElementById('overlay');
      if (overlay) overlay.remove();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}></div>
  );
};

export default DiagonalScrollAnimation;