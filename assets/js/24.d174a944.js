(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{303:function(r,e,t){r.exports=t.p+"assets/img/577bed35454f4e6ba04920e1793b14e4.84d9d7f9.png"},324:function(r,e,t){"use strict";t.r(e);var o=t(10),a=Object(o.a)({},(function(){var r=this,e=r._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[e("h1",{attrs:{id:"为了解决服务启动慢的问题-我为什么要给apollo和spring提交pr"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为了解决服务启动慢的问题-我为什么要给apollo和spring提交pr"}},[r._v("#")]),r._v(" 为了解决服务启动慢的问题，我为什么要给Apollo和Spring提交PR？")]),r._v(" "),e("p",[r._v("最近在整理之前记录的工作笔记时，看到之前给团队内一组服务优化启动耗时记录的笔记，简单整理了一下分享出来。问题原因并不复杂，主要是如何精准测量和分析，优化后如何定量测量优化效果，说人话就是用实际数据证明优化效果。")]),r._v(" "),e("h2",{attrs:{id:"背景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[r._v("#")]),r._v(" 背景")]),r._v(" "),e("p",[r._v("团队内有一组服务启动明显较其它服务要慢（线上启动超过2分钟），偶尔还会超过容器liveness的最大超时时间导致服务启动到一半又被kill掉重新启动，由于服务没有启动完成是不会接入流量的，影响最明显的是日常变更维护时等待服务滚动部署的时间较长，另外服务在本地启动也比较慢，浪费程序员的时间。")]),r._v(" "),e("p",[r._v("当时我并不是该服务的开发人员，相关的业务逻辑了解不多，据相关同学反映，该服务在Apollo（一个开源的应用配置管理中心）上有大量配置，启动时需要加载这些配置，随着配置逐渐增多，启动时间也越来越慢，我去Apollo上统计了一下大约有5000行properties配置，5000行配置加载到Spring容器的配置bean需要分钟级？听起来就不大合理。")]),r._v(" "),e("h2",{attrs:{id:"分析过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析过程"}},[r._v("#")]),r._v(" 分析过程")]),r._v(" "),e("p",[r._v("配置项大致长下面这个样子，层级说多不算多，说少也不算少。")]),r._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[r._v("xxxx.dp.caption.converter[0].convertRules[0].castTo=BYTESTOSTRING\nxxxx.dp.caption.converter[0].convertRules[0].sourceField=city_id\nxxxx.dp.caption.converter[0].convertRules[0].targetField=cityId\nxxxx.dp.caption.converter[0].convertRules[1].castTo=BYTESTOSTRING\nxxxx.dp.caption.converter[0].convertRules[1].sourceField=city_name\nxxxx.dp.caption.converter[0].convertRules[1].targetField=cityName\n")])])]),e("p",[r._v("由于启动时间很长，有充足的时间执行jstack抓取threaddump，main线程如下：")]),r._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[r._v('"main@1" prio=5 tid=0x1 nid=NA runnable\n  java.lang.Thread.State: RUNNABLE\n\t  at java.util.HashMap.resize(HashMap.java:735)\n\t  at java.util.HashMap.putVal(HashMap.java:663)\n\t  at java.util.HashMap.put(HashMap.java:612)\n\t  at com.ctrip.framework.apollo.internals.DefaultConfig.stringPropertyNames(DefaultConfig.java:115)\n\t  at com.ctrip.framework.apollo.internals.DefaultConfig.getPropertyNames(DefaultConfig.java:105)\n\t  at com.ctrip.framework.apollo.spring.config.ConfigPropertySource.getPropertyNames(ConfigPropertySource.java:24)\n\t  at org.springframework.core.env.CompositePropertySource.getPropertyNames(CompositePropertySource.java:87)\n\t  at org.springframework.boot.context.properties.source.SpringIterableConfigurationPropertySource$CacheKey.get(SpringIterableConfigurationPropertySource.java:214)\n\t  at org.springframework.boot.context.properties.source.SpringIterableConfigurationPropertySource.getCache(SpringIterableConfigurationPropertySource.java:134)\n...\n')])])]),e("blockquote",[e("p",[r._v("由于stacktrace过长，这里就不贴完整的，感兴趣的读者可以查看"),e("a",{attrs:{href:"https://github.com/apolloconfig/apollo/issues/3800",target:"_blank",rel:"noopener noreferrer"}},[r._v("我在Apollo github仓库提交的issue分析"),e("OutboundLink")],1),r._v("。")])]),r._v(" "),e("p",[r._v("看上面的stacktrace，可以看到Apollo内部的一个方法调用"),e("code",[r._v("DefaultConfig.getPropertyNames")]),r._v("在不断向一个HashMap中填充数据致使其扩容。通过静态的stacktrace，我们能知道的信息也就仅限于此了，我们还不知道这段看起来消耗比较大的逻辑在整个启动过程的占比大概是多少，因此这里就需要用到Profiler工具了，当时我在本地用的是[JProfiler][jprofiler]，一款商业的Profiler工具。今天我们完全可以用开源免费的[async-profiler][asprof]替代。通过对启动过程进行profiling，得到下面结果：")]),r._v(" "),e("p",[e("img",{attrs:{src:t(303),alt:"alt text"}})]),r._v(" "),e("p",[r._v("有了这样自顶向下的树状分析结果，消耗最大的方法就很明显了，这里是"),e("code",[r._v("ConfigPropertySource#getPropertyNames")]),r._v("，到这里就需要结合Apollo的源代码进行分析了，最终定位到上面方法在启动过程中会在"),e("code",[r._v("Binder.bind")]),r._v("中调用很多次，这个方法的底层实现又是每次构造一个全新的数组，时间复杂度和加载的配置数量呈线性关系。在配置较多的场景下，消耗就非常明显了。由于这里的配置发生变化时，Apollo的客户端是可以感知到的，因此我们完全可以替换成使用缓存，配置变化后清理掉缓存的方式。因此基于这个思路，给Apollo提了PR：")]),r._v(" "),e("ul",[e("li",[r._v("https://github.com/apolloconfig/apollo/issues/3800")]),r._v(" "),e("li",[r._v("https://github.com/apolloconfig/apollo/pull/3816")])]),r._v(" "),e("p",[e("strong",[r._v("测试结果显示在配置加载阶段的耗时，从平均2分钟优化到不到1秒。")])]),r._v(" "),e("p",[r._v("在对大量配置场景下的启动测试profiling过程中，同时也发现了Spring framework的一处优化点，上面Apollo的热点方法优化之后，通过profile观测到的下一个热点方法就是"),e("code",[r._v("CompositePropertySource#getPropertyNames")]),r._v("了，"),e("code",[r._v("CompositePropertySource")]),r._v("顾名思义是对多个PropertySource的"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Composite_pattern",target:"_blank",rel:"noopener noreferrer"}},[r._v("PropertySource模式"),e("OutboundLink")],1),r._v("。")]),r._v(" "),e("p",[r._v("在Spring这种超级流行的项目中，哪怕是启动过程可以优化1秒，全世界大量项目可以从中收益，总量还是相当可观的。因此抱着这样的心态，给Spring也提交了PR：")]),r._v(" "),e("ul",[e("li",[r._v("https://github.com/spring-projects/spring-framework/pull/27236")])]),r._v(" "),e("p",[r._v("由于涉及到spring-core模块的变动，并且这个方法调用在启动过程中也属于hot code path，因此是需要编写相应的微基准测试的。Spring使用openjdk衍生出的"),e("a",{attrs:{href:"https://openjdk.org/projects/code-tools/jmh/",target:"_blank",rel:"noopener noreferrer"}},[r._v("Java Microbenchmark Harness (JMH)"),e("OutboundLink")],1),r._v("工具做"),e("a",{attrs:{href:"%5Bhttps://github.com/spring-projects/spring-framework/wiki/Micro-Benchmarks%5D(https://github.com/spring-projects/spring-framework/wiki/Micro-Benchmarks)"}},[r._v("微基准测试")]),r._v("。")]),r._v(" "),e("p",[r._v("通过前后对比维基准测试的结果，形成实实在在的数据验证代码优化后的效果，上面的调整最终大约有"),e("code",[r._v("-30%")]),r._v("的执行时间缩减。")]),r._v(" "),e("p",[r._v("关于JMH，可以通过"),e("a",{attrs:{href:"https://youtu.be/Bi0E7w1ZFFA?si=Z7W8P-t1pRADUfov",target:"_blank",rel:"noopener noreferrer"}},[r._v("视频"),e("OutboundLink")],1),r._v("和它的代码仓中自带的samples中学习一下如何使用。")]),r._v(" "),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[r._v("#")]),r._v(" 总结")]),r._v(" "),e("ol",[e("li",[r._v("通过对启动过程进行profiling定位到消耗大的方法，结合源代码理解相关逻辑，找到可行的优化点，代码优化后再对比前后测量结果验证优化效果。")]),r._v(" "),e("li",[r._v("通过JMH等微基准测试工具对单个方法进行基准测试，形成容易被复现的测试和数据。")]),r._v(" "),e("li",[r._v("找到可以帮助review方案和提供建议的人，文章的例子是提PR的方式找到了Apollo社区成员同时也是Apollo作者之一，通过讨论最终形成的方案相较最初的“补丁式”优化更加优雅和合理。")])])])}),[],!1,null,null,null);e.default=a.exports}}]);