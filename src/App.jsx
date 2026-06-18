import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  CalendarCheck,
  FaceMask,
  Sparkle,
  ChatsCircle,
  Smiley,
  Drop,
  ArrowsInLineHorizontal,
  Heart,
  Student,
  HandsPraying,
  InstagramLogo,
  WhatsappLogo,
  Scales,
  Crown,
  FlowerLotus,
  SealCheck
} from '@phosphor-icons/react';
import './styles.css';

const WHATSAPP_BOOKING = 'https://wa.me/85263829196?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%83%B3%E9%A0%90%E7%B4%84%20Move%20Your%20Life%20%E5%B0%8F%E9%A1%8F%E8%AB%AE%E8%A9%A2';
const WHATSAPP_CLASS = 'https://wa.me/85263829196?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%83%B3%E7%95%99%E5%90%8D%20Move%20Your%20Life%20%E5%B0%8F%E9%A1%8F%E6%95%99%E5%AD%B8%E7%8F%AD';

const navItems = [
  ['首頁', '#top'],
  ['療程重點', '#method'],
  ['真實案例', '#cases'],
  ['預約流程', '#flow'],
  ['教學班', '#class']
];

const awardTickerItems = [
  '2026 韓國 ABIL 亞洲美容聯盟 無創小顏項目冠軍',
  '2025 國際 IQA 徒手小顏＆骨盆調整冠軍',
  '2025 台灣 CBC 國際美業大賽 無創小顏亞軍',
  '為過萬名女士改善面型',
  '國際得獎小顏師 Jacky'
];

const featureCards = [
  { icon: CalendarCheck, title: '預約制', desc: '每位客人專屬時段' },
  { icon: FaceMask, title: '分析面型', desc: '面部不對稱、輪廓、水腫' },
  { icon: Sparkle, title: '自然無創', desc: '徒手微調，不作硬性推銷' },
  { icon: ChatsCircle, title: 'WhatsApp 查詢', desc: '先了解需要再安排' }
];

const concerns = [
  { icon: Smiley, title: '面部不對稱', desc: '左右比例不一致' },
  { icon: Drop, title: '水腫感', desc: '面部線條偏鬆散' },
  { icon: ArrowsInLineHorizontal, title: '輪廓線', desc: '下顎位置不清晰' },
  { icon: Heart, title: '咀嚼肌', desc: '繃緊、外擴、受力' },
  { icon: Scales, title: '大小臉', desc: '相片中更明顯' },
  { icon: FlowerLotus, title: '嘴部與下巴偏斜', desc: '面部中心線偏移' }
];

const methodBullets = [
  '先進行面型分析，判斷受力、比例與日常習慣',
  '以徒手定位微調，處理下顎、顴骨與輪廓線',
  '改善水腫感與繃緊感，使線條自然回復平衡'
];

const casePairs = [
  {
    title: '面部平衡調整',
    note: '左右比例與面型中心線',
    before: '/assets/crops/face-before-01.jpg',
    after: '/assets/crops/face-after-01.jpg'
  },
  {
    title: '水腫感整理',
    note: '輪廓感更輕盈、更清晰',
    before: '/assets/crops/face-before-02.jpg',
    after: '/assets/crops/face-after-02.jpg'
  },
  {
    title: '輪廓線調整',
    note: '下顎線與臉側線條',
    before: '/assets/crops/face-before-03.jpg',
    after: '/assets/crops/face-after-03.jpg'
  },
  {
    title: '即時小顏效果',
    note: '一次療程後前後對比',
    before: '/assets/crops/face-before-04.jpg',
    after: '/assets/crops/face-after-04.jpg'
  }
];

const benefitItems = [
  ['輪廓更清晰', '下顎與側面線條更利落'],
  ['水腫感下降', '視覺上更輕盈、更有精神'],
  ['左右更平衡', '改善相片中的不對稱感'],
  ['咀嚼肌放鬆', '降低繃緊及外擴感'],
  ['自然非入侵', '保持本人面型特徵']
];

const flowSteps = [
  ['01', '初步查詢', 'WhatsApp 了解面型困擾'],
  ['02', '面型分析', '到店觀察比例與受力'],
  ['03', '徒手微調', '按需要處理輪廓重點'],
  ['04', '效果確認', '完成後對比與整理建議'],
  ['05', '日常跟進', '提醒咀嚼、姿勢與保養']
];

const classHighlights = [
  {
    icon: FaceMask,
    title: '學會面型分析',
    desc: '水腫｜咬肌｜大小臉｜下顎線｜不對稱'
  },
  {
    icon: HandsPraying,
    title: '掌握完整流程',
    desc: '肩頸放鬆｜淋巴循環｜肌肉放鬆｜輪廓整理'
  },
  {
    icon: Crown,
    title: '開拓事業方向',
    desc: '加入美容服務｜建立技術｜發展小顏項目'
  }
];

const courseTracks = [
  {
    title: '小顏微調入門塑形班',
    duration: '3天｜共11小時',
    fit: '零基礎、美容從業員、轉行人士',
    days: ['面骨分析', '正位手法', '流程實踐'],
    price: '$10,500'
  },
  {
    title: '小顏微調國際冠軍班',
    duration: '3天｜共11小時',
    fit: '已有基礎、希望進階／參賽／開店',
    days: ['冠軍思維', '高級手法', '商業落地'],
    price: '$16,500'
  }
];

const COURSE_CERTS = ['IFBC', 'SISA', 'K-Beauty', 'GPF', 'IQA'];

const courseIncludes = ['小班教學', '理論＋實操', '真人練習', '教材筆記', '結業證書', '課後支援群組'];

const revealVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 }
};

// Hero 文案逐行落場：眉題 → 大標 → 副題 → 按鈕 → 細註
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
};

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      variants={revealVariants}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.56, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AmbientMotion() {
  const reduce = useReducedMotion();
  const floatA = reduce ? undefined : { x: [0, 18, -8, 0], y: [0, -12, 12, 0], scale: [1, 1.05, 0.98, 1] };
  const floatB = reduce ? undefined : { x: [0, -16, 8, 0], y: [0, 14, -8, 0], scale: [1, 0.96, 1.04, 1] };

  return (
    <div className="ambient-motion" aria-hidden="true">
      <motion.span
        className="ambient-orb ambient-orb-rose"
        animate={floatA}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="ambient-orb ambient-orb-gold"
        animate={floatB}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="ambient-line"
        animate={reduce ? undefined : { opacity: [0.18, 0.42, 0.18], x: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function Logo() {
  return (
    <a className="logo-lockup" href="#top" aria-label="Move Your Life home">
      <span className="logo-mark logo-mark-image">
        <img src="/assets/logo-myl-gold.png" alt="" aria-hidden="true" />
      </span>
      <span>
        <strong>MOVE<br />YOUR LIFE</strong>
        <small>HK</small>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="topbar">
      <Logo />
      <nav className="topnav" aria-label="主要導覽">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-button" href={WHATSAPP_BOOKING} target="_blank" rel="noreferrer">預約查詢</a>
    </header>
  );
}

function AwardMarquee() {
  return (
    <section className="award-marquee" aria-label="Jacky 獎項與賽事經驗">
      <div className="award-marquee-track">
        {[0, 1].map((group) => (
          <div className="award-marquee-group" key={group} aria-hidden={group === 1 ? 'true' : undefined}>
            {awardTickerItems.map((item) => (
              <span className="award-marquee-item" key={`${group}-${item}`}>
                <Crown size={15} weight="fill" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.26], [0, -42]);
  const imageScale = useTransform(scrollYProgress, [0, 0.26], [1, 1.045]);

  return (
    <section className="hero-section" id="top">
      <AmbientMotion />
      <motion.div
        className="hero-copy"
        initial={reduce ? false : 'hidden'}
        animate={reduce ? undefined : 'show'}
        variants={heroStagger}
      >
        <motion.p variants={heroItem} className="mini-brand">Move Your Life</motion.p>
        <motion.h1 variants={heroItem}>無創徒手小顏術</motion.h1>
        <motion.p variants={heroItem} className="subhead">由國際得獎小顏師 Jacky 主理，從面型比例與水腫感入手。</motion.p>
        <motion.div variants={heroItem} className="hero-actions">
          <motion.a whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }} className="btn btn-dark" href={WHATSAPP_BOOKING} target="_blank" rel="noreferrer">立即預約</motion.a>
          <motion.a whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }} className="btn btn-light" href="#cases">查看案例</motion.a>
        </motion.div>
        <motion.p variants={heroItem} className="micro-note">尖沙咀預約制｜國際得獎小顏師 Jacky 主理</motion.p>
      </motion.div>
      <motion.figure
        className="hero-face-card hero-award-card"
        initial={reduce ? false : { opacity: 0, scale: 0.96, x: 18 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/assets/crops/hero-jacky-award-2026-fit.jpg"
          alt="Jacky 手持獎盃，榮獲 2026 韓國 ABIL 亞洲美容聯盟無創小顏項目冠軍"
          style={reduce ? undefined : { y: imageY, scale: imageScale }}
        />
        <span className="hero-sheen" aria-hidden="true" />
        <figcaption>2026 ABIL 無創小顏冠軍</figcaption>
      </motion.figure>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="服務特色">
      {featureCards.map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={index * 0.04} className="feature-tile">
            <Icon size={24} weight="duotone" />
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </Reveal>
        );
      })}
    </section>
  );
}

function ConcernGrid() {
  return (
    <section className="soft-panel concerns" id="concerns">
      <Reveal>
        <p className="section-label">Face Check</p>
        <h2>你是否有這些面部困擾？</h2>
      </Reveal>
      <div className="concern-grid">
        {concerns.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.035} className="concern-card">
              <Icon size={26} weight="thin" />
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="split-section" id="method">
      <Reveal className="split-copy">
        <p className="section-label">Signature Method</p>
        <h2>獨門無創徒手小顏術</h2>
        <p>Jacky 會先觀察面型結構與受力狀態，再用定位微調手法處理比例、線條與緊繃感。</p>
        <ul className="tick-list">
          {methodBullets.map((item) => (
            <li key={item}><SealCheck size={18} weight="fill" />{item}</li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="method-photo method-event-photo" delay={0.08}>
        <img src="/assets/crops/international-event-jacky-2025.jpg" alt="Jacky 於 2025 CBC 國際美業技術賽事現場進行專業手法展示" />
        <span>國際賽事現場｜專業手法展示</span>
      </Reveal>
    </section>
  );
}

function BeforeAfterPin({ item, index }) {
  const reduce = useReducedMotion();
  const handleRangeInput = (event) => {
    event.currentTarget.parentElement?.style.setProperty('--reveal', `${event.currentTarget.value}%`);
  };

  return (
    <Reveal className={`case-pin case-pin-${index + 1}`} delay={index * 0.04}>
      <span className="case-board-pin" aria-hidden="true" />
      <motion.div
        className="before-after-frame"
        style={{ '--reveal': '50%' }}
        whileInView={reduce ? undefined : { '--reveal': ['50%', '62%', '42%', '50%'] }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 1.9, delay: 0.5 + index * 0.18, ease: 'easeInOut', times: [0, 0.36, 0.74, 1] }}
      >
        <img className="compare-before" src={item.before} alt={`Move Your Life ${item.title} 療程前`} />
        <div className="compare-after-mask">
          <img className="compare-after" src={item.after} alt={`Move Your Life ${item.title} 療程後`} />
        </div>
        <span className="compare-label compare-label-before">Before</span>
        <span className="compare-label compare-label-after">After</span>
        <span className="compare-divider" aria-hidden="true">
          <span />
        </span>
        <input
          className="compare-range"
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          onInput={handleRangeInput}
          onChange={handleRangeInput}
          aria-label={`左右拖動查看 ${item.title} 前後對比`}
        />
      </motion.div>
      <div className="case-pin-copy">
        <strong>{item.title}</strong>
        <span>{item.note}</span>
      </div>
    </Reveal>
  );
}

function CasesSection() {
  return (
    <section className="cases-section" id="cases">
      <Reveal className="section-center">
        <p className="section-label">Face Transformation</p>
        <h2>真實案例</h2>
        <p>每張圖釘卡均呈現一位客人的前後對比，左右拖動相片即可查看變化。</p>
      </Reveal>
      <div className="case-board" aria-label="Move Your Life 四位客人前後對比畫板">
        <div className="case-board-head">
          <strong>Before / After Board</strong>
          <span>拖動中間線查看療程前後</span>
        </div>
        <div className="case-pin-grid">
          {casePairs.map((item, index) => (
            <BeforeAfterPin item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>
      <p className="case-note">* 以公開 IG 真實個案截圖裁切。眼部已按原圖私隱處理。</p>
    </section>
  );
}

function BenefitSection() {
  return (
    <section className="benefit-section">
      <Reveal className="section-center">
        <p className="section-label">Result Points</p>
        <h2>成果解析</h2>
      </Reveal>
      <div className="benefit-row">
        {benefitItems.map(([title, desc], index) => (
          <Reveal className="benefit-item" key={title} delay={index * 0.035}>
            <span className="line-icon"><FaceMask size={27} weight="thin" /></span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CompareSection() {
  return (
    <section className="compare-section">
      <Reveal className="section-center">
        <h2>骨相 vs 肉感，你屬於哪一種？</h2>
      </Reveal>
      <div className="compare-layout">
        <Reveal className="compare-card">
          <h3>骨面型</h3>
          <ul>
            <li>下顎角較為明顯</li>
            <li>左右骨位比例不一</li>
            <li>需要重點分析面型結構</li>
          </ul>
        </Reveal>
        <Reveal className="compare-face" delay={0.05}>
          <img src="/assets/crops/hero-face-after.jpg" alt="小顏後面型參考" />
          <span>面型分析後再處理</span>
        </Reveal>
        <Reveal className="compare-card" delay={0.1}>
          <h3>肉感面型</h3>
          <ul>
            <li>水腫感及鬆散感明顯</li>
            <li>咀嚼肌或筋膜偏緊</li>
            <li>適合放鬆與循環方向</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="flow-section" id="flow">
      <Reveal className="section-center">
        <p className="section-label">Booking Flow</p>
        <h2>首次體驗流程</h2>
      </Reveal>
      <div className="flow-grid">
        {flowSteps.map(([num, title, desc], index) => (
          <Reveal className="flow-card" key={num} delay={index * 0.035}>
            <span>{num}</span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClassSection() {
  return (
    <section className="class-section" id="class">
      <Reveal className="class-hero-card">
        <div className="class-hero-copy">
          <span className="class-badge">小班教學｜真人實操</span>
          <h2>Jacky 小顏微調教學班</h2>
          <p className="class-mainline">不只是學習手法，而是學會判斷面型。</p>
          <p className="class-summary">
            由面型分析、肩頸放鬆、淋巴引流、咬肌調整到輪廓線條整理，整理成一套清晰、可實踐的小顏教學系統。
          </p>
          <div className="class-audience" aria-label="適合對象">
            {['美容從業人員', '轉行人士', '增加專業服務'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="class-includes-panel">
          <div className="class-panel-head">
            <Student size={22} weight="duotone" />
            <span>課程包含</span>
          </div>
          <div className="course-includes">
            {courseIncludes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <a className="btn btn-class" href={WHATSAPP_CLASS} target="_blank" rel="noreferrer">
            立即查詢課程 / 索取開班資料
          </a>
        </div>
      </Reveal>

      <div className="course-track-grid" aria-label="課程資料">
        {courseTracks.map((course, index) => (
          <Reveal className="course-track-card" key={course.title} delay={index * 0.05}>
            <span className="course-track-label">{index === 0 ? '入門' : '進階'}</span>
            <h3>{course.title}</h3>
            <strong>{course.duration}</strong>
            <p>{course.fit}</p>
            <div className="course-days">
              {course.days.map((d, i) => (
                <span key={d}><i>D{i + 1}</i>{d}</span>
              ))}
            </div>
            <div className="course-price"><small>課程費用</small>{course.price}</div>
          </Reveal>
        ))}
      </div>

      <Reveal className="class-bundle-card">
        <div className="bundle-copy">
          <span className="bundle-label">兩班同時報讀</span>
          <strong className="bundle-price">$22,950</strong>
          <span className="bundle-save">原價 $27,000｜可節省 $4,050</span>
        </div>
        <a className="btn btn-class bundle-btn" href={WHATSAPP_CLASS} target="_blank" rel="noreferrer">查詢優惠名額</a>
      </Reveal>

      <Reveal className="class-cert-note">
        <p>每班最後一天設考試，合格可申請證書</p>
        <div className="cert-chips" aria-label="冠軍班可申請國際證書">
          <span className="cert-chips-label">冠軍班可申請</span>
          {COURSE_CERTS.map((c) => (
            <span className="cert-chip" key={c}>{c}</span>
          ))}
          <span className="cert-chips-label">國際證書</span>
        </div>
      </Reveal>

      <div className="class-highlight-grid">
        {classHighlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal className="class-highlight-card" key={item.title} delay={index * 0.04}>
              <span className="class-icon"><Icon size={25} weight="duotone" /></span>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const reviewShots = [
  { src: '/assets/reviews/review-01.webp', alt: 'Move Your Life 客人五星好評截圖：Jacky 非常專業，每個步驟後都明顯感受到臉部改變，朋友見面問是不是瘦了。' },
  { src: '/assets/reviews/review-02.webp', alt: 'Move Your Life 客人五星好評截圖：只做兩次小顏效果已很明顯，對眼平衡返好多、面骨收返入去、線條順滑返。' },
  { src: '/assets/reviews/review-03.webp', alt: 'Move Your Life 客人五星好評截圖：無痛、唔 hard sell、單次收費，做咗第四次輪廓 smooth 咗、下顎線突出咗。' },
  { src: '/assets/reviews/review-04.webp', alt: 'Move Your Life 客人五星好評截圖：個鼻再高咗、直咗，成日俾人問係咪整容。' }
];

function Testimonials() {
  return (
    <section className="testimonial-section">
      <Reveal className="section-center">
        <p className="section-label">Customer Voice</p>
        <h2>客人真實評價</h2>
        <p>客人於 WhatsApp 及 IG 發送的真實好評截圖，個人資料已隱去。</p>
      </Reveal>
      <div className="review-wall">
        {reviewShots.map((r, index) => (
          <Reveal className="review-quote" key={index} delay={index * 0.05}>
            <span className="review-stars" role="img" aria-label="五星好評">★★★★★</span>
            <img className="review-shot" src={r.src} alt={r.alt} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DarkCta() {
  return (
    <section className="dark-cta" id="booking">
      <Reveal className="dark-copy">
        <h2>不要只靠濾鏡，讓面部輪廓回到自然平衡。</h2>
        <p>可先透過 WhatsApp 傳送相片查詢，Jacky 會按面型狀態回覆可行方向。</p>
        <a className="btn btn-warm" href={WHATSAPP_BOOKING} target="_blank" rel="noreferrer"><WhatsappLogo size={18} weight="fill" /> WhatsApp 預約</a>
      </Reveal>
      <Reveal className="dark-photo" delay={0.08}>
        <img src="/assets/crops/face-after-02.jpg" alt="Move Your Life 小顏後輪廓案例" />
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <div className="footer-info">
        <p>尖沙咀｜預約制｜6382 9196</p>
        <p>無創徒手小顏術｜真實個案｜教學班籌備中</p>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/moveyourlifehk" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo size={18} /></a>
        <a href={WHATSAPP_BOOKING} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={18} /></a>
      </div>
    </footer>
  );
}

const skullCallouts = [
  // pos：marker 喺 .skull-orbit 入面嘅大約位置（%），指住描述緊嘅面型部位
  { tag: '顴骨比例', en: 'Cheek Line', desc: '觀察面中段高度與寬度，找回自然立體感。', pos: { x: 35.5, y: 55 } },
  { tag: '咬肌放鬆', en: 'Masseter', desc: '由受力與繃緊感入手，減少輪廓緊繃感。', pos: { x: 37, y: 57 } },
  { tag: '下顎線條', en: 'Jawline', desc: '整理側面線條，使視覺上更輕盈、更清晰。', pos: { x: 44, y: 70 } },
  { tag: '左右平衡', en: 'Balance', desc: '以溫和手法處理面部中心線與左右差異。', pos: { x: 50, y: 50 }, type: 'axis' }
];
const SKULL_FRAMES = 73; // 頭骨旋轉序列張數（/assets/skull-frames/f-001..073.jpg）
const SKULL_V = 2;

function FacialArchitecture() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const sizedRef = useRef(false);
  const renderRef = useRef(() => {});
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900;
    const frames = framesRef.current;
    const blit = (img) => {
      if (!img || !img.complete || !img.naturalWidth) return false;
      if (!sizedRef.current) {
        const s = isTouch ? Math.min(1, 900 / img.naturalWidth) : 1;
        canvas.width = Math.round(img.naturalWidth * s);
        canvas.height = Math.round(img.naturalHeight * s);
        sizedRef.current = true;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return true;
    };
    const nearest = (i) => {
      if (frames[i] && frames[i].complete) return i;
      for (let d = 1; d < SKULL_FRAMES; d++) {
        if (frames[i - d] && frames[i - d].complete) return i - d;
        if (frames[i + d] && frames[i + d].complete) return i + d;
      }
      return -1;
    };
    renderRef.current = (fi) => {
      const i0 = Math.floor(fi);
      const frac = fi - i0;
      const i1 = Math.min(SKULL_FRAMES - 1, i0 + 1);
      const base = nearest(i0);
      if (base < 0) return;
      ctx.globalAlpha = 1;
      blit(frames[base]);
      if (frac > 0.01 && base === i0 && frames[i1] && frames[i1].complete) {
        ctx.globalAlpha = frac;
        ctx.drawImage(frames[i1], 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
    };
    for (let i = 0; i < SKULL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      if (i === 0) img.onload = () => renderRef.current(0);
      img.src = `/assets/skull-frames/f-${String(i + 1).padStart(3, '0')}.jpg?v=${SKULL_V}`;
      frames[i] = img;
    }

    // 用 rAF lerp 令頭骨幀數平滑追上滾動目標，唔會逐個 scroll event 跳格
    let rafId = 0;
    const tick = () => {
      const cur = currentFrameRef.current;
      const tgt = targetFrameRef.current;
      const next = cur + (tgt - cur) * 0.1;
      currentFrameRef.current = Math.abs(tgt - cur) < 0.0015 ? tgt : next;
      renderRef.current(currentFrameRef.current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const cp = Math.min(1, Math.max(0, p));
    // 頭三段（0–75%）順轉成個序列；入到「左右平衡」段就快速倒轉返正面（75–85%），
    // 之後一直保持正面，成段都睇到中心線同左右對稱
    const FWD_END = 0.75;
    const BACK_END = 0.85;
    let frameP;
    if (cp <= FWD_END) frameP = cp / FWD_END;
    else if (cp <= BACK_END) frameP = 1 - (cp - FWD_END) / (BACK_END - FWD_END);
    else frameP = 0;
    targetFrameRef.current = frameP * (SKULL_FRAMES - 1);
    setActive(Math.min(skullCallouts.length - 1, Math.floor(cp * skullCallouts.length)));
  });

  return (
    <section ref={sectionRef} className="skull-section" id="structure">
      <div className="skull-stage">
        <div className="skull-head">
          <p className="section-label">Face Balance Map</p>
          <h2>讀懂面型，慢慢調整</h2>
          <p className="skull-lede">請停留在此段慢慢滑動，完成整個面型地圖後，再進入下一部分。</p>
        </div>

        <div className="skull-orbit" aria-hidden="true">
          <span className="skull-glow" />
          <canvas ref={canvasRef} className="skull-canvas" />
          {skullCallouts[active].type === 'axis' ? (
            <div className="skull-axis">
              <span className="skull-axis-line" />
              <span className="skull-axis-dot skull-axis-dot-l"><span className="skull-pointer-ring" /></span>
              <span className="skull-axis-dot skull-axis-dot-r"><span className="skull-pointer-ring" /></span>
              <span className="skull-pointer-tag skull-axis-tag">{skullCallouts[active].tag}</span>
            </div>
          ) : (
            <>
              <span
                className="skull-lead"
                style={{ '--px': `${skullCallouts[active].pos.x}%`, top: `${skullCallouts[active].pos.y}%` }}
              />
              <span
                className="skull-pointer"
                style={{ left: `${skullCallouts[active].pos.x}%`, top: `${skullCallouts[active].pos.y}%` }}
              >
                <span className="skull-pointer-ring" />
                <span className="skull-pointer-dot" />
              </span>
              <span className="skull-pointer-tag" style={{ top: `${skullCallouts[active].pos.y}%` }}>
                {skullCallouts[active].tag}
              </span>
            </>
          )}
        </div>

        <div className="skull-features">
          {skullCallouts.map((c, i) => (
            <figure className={`skull-feature ${active === i ? 'is-active' : ''}`} key={c.tag}>
              <span className="skull-feature-index">0{i + 1}</span>
              <strong>{c.tag}<i>{c.en}</i></strong>
              <p>{c.desc}</p>
            </figure>
          ))}
        </div>

        <ol className="skull-steps" aria-hidden="true">
          {skullCallouts.map((c, i) => (
            <li key={c.tag} className={active === i ? 'is-active' : ''}>
              <span>0{i + 1}</span>{c.tag}
            </li>
          ))}
        </ol>

        <span className="skull-cue" aria-hidden="true">SCROLL ↓</span>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      touchMultiplier: 1.2
    });
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="page-frame">
        <AwardMarquee />
        <Header />
        <Hero />
        <FeatureStrip />
        <ConcernGrid />
        <FacialArchitecture />
        <MethodSection />
        <CasesSection />
        <BenefitSection />
        <CompareSection />
        <FlowSection />
        <ClassSection />
        <Testimonials />
        <DarkCta />
        <Footer />
      </section>
      <p className="disclaimer">提示：本頁根據 @moveyourlifehk 公開 IG 資料整理。內容屬美容服務介紹，並非醫療診斷或治療建議。實際效果會因個人狀況與療程次數而不同。</p>
    </main>
  );
}

export default App;
