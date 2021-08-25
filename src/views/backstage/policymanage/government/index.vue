<template>
  <div class="goverment" ref="goverment">
    <div class="govtop">
      <!-- <div>{{$store.state.hotlist2}}</div> -->
      <div class="navleft">
        <div class="iptfind">
          <div class="loge1">
            <img src="@/assets/indexlogo/zccx.png" alt="" />
          </div>
          <span
            class="onelogo"
            ref="onelogo"
            style="color: #4cabff"
            @click="routerzc"
            >政策查询</span
          >
          <div class="loge1 loge2">
            <img src="@/assets/indexlogo/gsmd.png" alt="" />
          </div>
          <span class="twospan" ref="twospan" @click="routermd"
            >公示名单查询</span
          >
        </div>
        <div style="margin-top: 15px; width: 400px">
          <el-input
            placeholder="请输入内容"
            v-model.trim="queyform.title"
            class="input-with-select"
            @keyup.enter.native="selectTitle"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              class="iconfont btnssearch"
              @click="selectTitle"
            ></el-button>
          </el-input>
        </div>

        <!-- 地区部分 -->
        <div class="diqu diuqsty">
          <span>地区</span>

          <ul>
            <li @click="allqiqu" ref="alldiqu" style="padding: 15px 10px">
              全部
            </li>
            <li
              style=""
              v-for="item in diqulist"
              :key="item.areaId"
              @click="clickarea(item.areaId, item.areaCode)"
              :class="{ active: item.areaId == checkcolor1 }"
            >
              {{ item.areaName }}
            </li>
          </ul>
        </div>
        <!-- 部委部分 -->
        <div class="diqu hangye buweiall" ref="changehyH">
          <el-button
            type="primary"
            size="mini"
            @click="btnishow"
            class="btnshow"
            >更多
            <i
              :class="[
                isShowIcon ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
              ]"
              class="el-icon--right"
            ></i
          ></el-button>
          <span style="margin-top: 18px">部委</span>
          <ul>
            <li @click="allbuwei" ref="allbuwei">全部</li>
            <li
              v-for="(item, index) in deplist"
              :key="item.departmentId"
              @click="changeSpan(index, item.departmentId)"
              :class="{ bgcolor: spanIndex.indexOf(item.departmentId) > -1 }"
            >
              {{ item.area.areaName }}{{ item.departmentName }}
            </li>
          </ul>
        </div>
        <!-- 行业 -->
        <div class="diqu buwei">
          <span style="margin-top: 15px">行业</span>

          <ul>
            <li @click="allhangye" ref="hangye">全部</li>
            <li
              v-for="item in categorylist"
              :key="item.categoryId"
              @click="changeSpanhangye(item.categoryId)"
              :class="{ bgcolor: spanIndex2.indexOf(item.categoryId) > -1 }"
            >
              {{ item.categoryName }}
            </li>
          </ul>

          <!-- 子行业 -->
          <ul style="float: right; padding-left: 29px; width: 100%">
            <li
              style="color: #999"
              v-for="(item, index) in zihangye"
              :key="index"
              :class="{ bgcolor: spanIndex5.indexOf(item.categoryId) > -1 }"
              @click="changeSonhangye(item.categoryId)"
            >
              {{ item.categoryName }}
            </li>
          </ul>
          <!-- 子行业 -->
        </div>

        <!-- 项目 -->
        <div class="diqu hangye xiangmu">
          <span style="margin-top: 15px">项目</span>
          <ul>
            <li @click="allxm" ref="xm">全部</li>
            <li
              v-for="item in projectlist"
              :key="item.projectId"
              @click="changeSpanxm(item.projectId)"
              :class="{ bgcolor: spanIndex3.indexOf(item.projectId) > -1 }"
            >
              {{ item.projectName }}
            </li>
          </ul>
        </div>

        <!-- 主体 -->
        <div class="diqu buwei zhuti">
          <span>主体</span>
          <ul>
            <li @click="allzt" ref="zt">全部</li>
            <li
              v-for="item in subjectlist"
              :key="item.subjectId"
              @click="changeSpanxzt(item.subjectId)"
              :class="{ bgcolor: spanIndex4.indexOf(item.subjectId) > -1 }"
            >
              {{ item.subjectName }}
            </li>
          </ul>
        </div>

        <!-- 年份 -->
        <div class="diqu year">
          <span>年份</span>
          <ul>
            <li @click="allnf" ref="nf">全部</li>
            <li
              v-for="item in yearlist"
              :key="item.id"
              @click="clickyear(item.id)"
              :class="{ active: item.id == checkcolor6 }"
            >
              {{ item.year }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 热搜榜 -->
      <div class="naveight" >
        <el-card class="card2" style="height:518px">
          <h1>
            <img src="@/assets/indexlogo/huologo.png" alt="" /><span
              >政策热搜榜</span
            >
          </h1>
          <div class="yanse">
            <div ref="span1" :style="{ width: spanw1 }"></div>
            <div ref="span2" :style="{ width: spanw2 }"></div>
            <div ref="span3" :style="{ width: spanw3 }"></div>
            <div ref="span4" :style="{ width: spanw4 }"></div>
            <div ref="span5" :style="{ width: spanw5 }"></div>
          </div>
          <div class="pingfen">
            <ul>
              <li
                v-for="(item) in hotlist"
                :key="item.policyId"
                @click="hotlick(item.policyId)"
                ref="liref"
              >
              <i></i>
                      <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                popper-class="popperclass"
                >
               <div style="min-width:5%">{{ item.year }}{{ item.title }}</div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div slot="reference"> {{ item.year }}{{ item.title | ellipsishot }}</div>
              </el-popover>
                  <span>{{ item.scale }}%</span>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    <div class="geduan" ref="geduan"></div>

    <!-- 中部政策查询表格  -->
    <div class="selectlist" v-if="showMindan">
      <el-table
        :data="tableData"
        style="
          width: 100%;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        "
        :header-cell-style="getclass"
      >
        <el-table-column label="项目名称" width="280" align="left">
          <template slot-scope="scope">
       
            <el-tooltip class="item" effect="dark" placement="top-start">        
              <div slot="content" class="text-container">
                {{ scope.row.year }}年{{ scope.row.title }}
              </div>
              <div @click="selectpage(scope.row.policyId)">
                {{ scope.row.year }}年{{ scope.row.title }}
              </div>           
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column
          label="立项部门"
          prop="departmentName"
          align="center"
        >
          <template slot-scope="scope">
            <div @click="selectpage(scope.row.policyId)">
              {{ scope.row.departmentName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="地区" >
          <template slot-scope="scope">
            <div @click="selectpage(scope.row.policyId)">
              {{ scope.row.areaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="230" label="申报时间">
          <template slot-scope="scope">
            <div
              @click="selectpage(scope.row.policyId)"
              v-if="scope.row.policyBeginTime"
            >
              <i class="el-icon-time" style="color: #6596ff"></i
              >{{ scope.row.policyBeginTime }}至{{ scope.row.policyEndTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address"  style="height: 50px"  label="申报条件">
          <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="700"
                trigger="hover"
                popper-class="popperclass"
                 v-show="scope.row.applicationConditions"
                >
               <div style="min-width:50%" v-html="scope.row.applicationConditions"></div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div slot="reference"  @click="selectpage(scope.row.policyId)" v-html=" $options.filters.ellipsis(scope.row.applicationConditions)"></div>
              </el-popover>
           
              <!-- <div
                v-show="scope.row.applicationConditions"
                @click="selectpage(scope.row.policyId)"
                v-html="scope.row.applicationConditions"
              ></div>
              </div> -->
           
         
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="上传时间">
          <template slot-scope="scope">
            <div @click="selectpage(scope.row.policyId)">
              {{ scope.row.createDate | Timefilters }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="address" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <div class="btnsds">
              <div class="btnss">
                <span
                  :class="{
                    immediately: scope.row.status == 1,
                    immed: scope.row.status == 0,
                    immediatelyNo: scope.row.status == 2,
                  }"
                  @click="immediately(scope.row.status, scope.row.declareUrl)"
                  >{{ scope.row.status | SbStatus }}</span
                >
                <span
                  :class="
                    scope.row.subscrip === 0 ? 'subscribe' : 'onsubscribe'
                  "
                  @click="subscribe(scope.row.policyId, scope.row.subscrip)"
                  >{{ scope.row.subscrip === 0 ? "订阅" : "已订阅" }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          :page-size="8"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 中部名单查询表格  -->
    <div class="selectlist" v-else>
      <el-table
        :data="mingdanList"
        key="status"
        style="
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        "
         :header-cell-style="getclass"
      >
        <el-table-column align="left" label="项目名称">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                {{ scope.row.year }}年{{ scope.row.title }}
              </div>
              <div @click="addmdxq(scope.row.policyId)">
                {{ scope.row.year }}年{{ scope.row.title }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="立项部门" align="center">
          <template slot-scope="scope">
            <div @click="addmdxq(scope.row.policyId)">
              {{ scope.row.departmentName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="地区" width="100" prop="areaName">
          <template slot-scope="scope">
            <div @click="addmdxq(scope.row.policyId)">
              {{ scope.row.areaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80" label="公示数量">
          <template slot-scope="scope">
            <div @click="addmdxq(scope.row.policyId)">
              {{ scope.row.publicNum }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="立项金额">
          <template slot-scope="scope">
            <div
              v-show="scope.row.totalPrice != 0"
              @click="addmdxq(scope.row.policyId)"
            >
              {{ scope.row.totalPrice | moneyFormTwo }}万元
            </div>
            <div
              @click="addmdxq(scope.row.policyId)"
              v-show="scope.row.totalPrice == 0"
            >
              未公开
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="批次">
          <template slot-scope="scope">
            <div @click="addmdxq(scope.row.policyId)">
              {{ scope.row.batchNo }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="公示时间">
          <template slot-scope="scope">
            <div class="btnsds" @click="addmdxq(scope.row.policyId)">
              {{ scope.row.publicityTime | iosTime }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChangemd"
          layout="prev, pager, next, jumper"
          :page-size="8"
          :total="totalmd"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 同行查询 -->
    <div class="peers">
      <div class="peerstop">
        <div class="peerstitle">
          <img src="@/assets/personal/7000.png" alt="" />
          <span>同行查询</span>
        </div>
        <el-autocomplete
          class="findinput"
          style="width: 800px"
          value-key="name"
          v-model.trim="tonghang"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          :popper-append-to-body="false" 
        >
          <el-button
            type="primary"
            style="background-color: #5689ff; color: white"
            slot="append"
            @click="selectcompany"
            icon="el-icon-search"
            class="btnssearch"
          ></el-button>
        </el-autocomplete>
      </div>
      <h1>
        自2015年起，深圳市获得资助企业
        <span>{{ totlaprice.totalNum }}家+</span>，资助总金额<span
          >{{ totlaprice.totalPrice | wanyuan }}万+</span
        >
      </h1>
      <div class="peersmain">
        <div
          v-for="(item, index) in tonghanglist"
          :key="index"
          class="peerscard"
          @click="selectcopeny2(item.name)"
        >
          <div class="namelogo"><img :src="item.imageUrl" alt="" /></div>
          <ul>
            <li>
              <!-- <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  {{ item.name }}
                </div>
                <div>{{ item.name | ellipsis }}</div>
              </el-tooltip> -->

               <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                popper-class="popperclass"
                >
               <div style="min-width:5%">{{ item.name }}</div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div slot="reference"> {{ item.name | ellipsishot}}</div>
              </el-popover>

            </li>
            <li>
              <span class="divcss">{{ item.status }}</span>
            </li>
            <li>
              <span>法定代表人：</span>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <span slot="content">
                  {{ item.operName }}
                </span>
                <span>{{ item.operName | ellipsisaaa }}</span>
              </el-tooltip>
            </li>
            <li>
              <span>成立日期：</span
              ><span>{{ item.startDate | iosTime }}</span>
            </li>
            <li>
              <span>资助总额：</span
              ><span>{{ item.total | moneyFormTwo }}万</span>
            </li>
          </ul>
        </div>
        <i></i><i></i><i></i>
      </div>

      <div class="block2 block3">
        <el-pagination
          @current-change="handleCurrentChangetx"
          layout="prev, pager, next, jumper"
          :page-size="8"
          :total="totaltx"
        >
        </el-pagination>
      </div>
    </div>

    <!--  政策日历 最新政策 最新公示名单 -->
    <div class="footer" ref="last">
      <el-tabs @tab-click="tabclick2" v-model="activeName">
        <!-- 政策日历 -->
        <el-tab-pane name="first">
          <template slot="label">
            <img
              style="vertical-align: middle !important"
              src="@/assets/personal/920.png"
              alt=""
            />
            政策日历
          </template>
          <el-table
            :data="catedata"
            v-if="activeName === 'first'"
            style="
              width: 100%;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            "
             :header-cell-style="getclass"
          >
            <el-table-column label="项目名称" width="280" align="left">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                  <div @click="selectpage(scope.row.policyId)">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="立项部门" align="center" >
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.departmentName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="地区">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.areaName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="申报条件">
              <template slot-scope="scope">
                <el-popover
                placement="top-start"
                trigger="hover"
                popper-class="popperclass"
                width="500"
                  v-show="scope.row.applicationConditions"
              >
                <div
                  style="min-width:5%"
                
                  v-html="scope.row.applicationConditions"
                ></div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div
                  slot="reference"
                  @click="selectpage(scope.row.policyId)"
                  v-html="
                    $options.filters.ellipsistj(scope.row.applicationConditions)
                  "
                ></div>
              </el-popover>
              </template>
            </el-table-column>
            <el-table-column width="180" label="申报时间">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  <i class="el-icon-time" style="color: #6596ff"></i
                  >{{ scope.row.policyBeginTime }}至{{
                    scope.row.policyEndTime
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="100" label="倒计时" align="center">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  <i class="el-icon-time" style="color: #6596ff"></i
                  >{{ scope.row.days }}天
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="address"
              align="center"
              label="操作"
              width="150px"
            >
              <template slot-scope="scope">
                <div class="btnsds">
                  <div class="btnss">
                    <span
                      :class="{
                        immediately: scope.row.status == 1,
                        immed: scope.row.status == 0,
                        immediatelyNo: scope.row.status == 2,
                      }"
                      @click="
                        immediately(scope.row.status, scope.row.declareUrl)
                      "
                      >{{ scope.row.status | SbStatus }}</span
                    >
                    <span
                      :class="
                        scope.row.subscrip === 0 ? 'subscribe' : 'onsubscribe'
                      "
                      @click="
                        subscribe2(scope.row.policyId, scope.row.subscrip)
                      "
                      >{{ scope.row.subscrip === 0 ? "订阅" : "已订阅" }}</span
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="block2">
            <el-pagination
              @current-change="handleCurrent2Change"
              layout="prev, pager, next, jumper"
              :page-size="8"
              :total="totalzcrl"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 政策日历 -->

        <!-- 最新政策第二个tabpaner -->
        <el-tab-pane name="second">
          <template slot="label">
            <img
              style="vertical-align: middle !important"
              src="@/assets/personal/803.png"
              alt=""
            />
            最新政策
          </template>

          <el-table
           :header-cell-style="getclass"
            :data="newsdata"
            v-if="activeName === 'second'"
            style="
              width: 100%;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            "
          >
            <el-table-column label="项目名称" width="280" align="left">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                  <div @click="selectpage(scope.row.policyId)">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="立项部门" align="center" >
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.departmentName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="地区">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.areaName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="申报条件">
              <template slot-scope="scope">
                  <el-popover
                placement="top-start"
                trigger="hover"
                popper-class="popperclass"
                width="500"
                 v-show="scope.row.applicationConditions"
              >
                <div
                
                  style="min-width:5%"
                  v-html="scope.row.applicationConditions"
                ></div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div
                  slot="reference"
                  @click="selectpage(scope.row.policyId)"
                  v-html="
                    $options.filters.ellipsistj(scope.row.applicationConditions)
                  "
                ></div>
              </el-popover>
              </template>
            </el-table-column>
            <el-table-column width="180" label="申报时间">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  <i class="el-icon-time" style="color: #6596ff"></i
                  >{{ scope.row.policyBeginTime }}至{{
                    scope.row.policyEndTime
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="180" align="center" label="上传时间">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  <i class="el-icon-time" style="color: #6596ff"></i
                  >{{ scope.row.createDate }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="address"
              align="center"
              label="操作"
              width="150px"
            >
              <template slot-scope="scope">
                <div class="btnsds">
                  <div class="btnss">
                    <span
                      :class="{
                        immediately: scope.row.status == 1,
                        immed: scope.row.status == 0,
                        immediatelyNo: scope.row.status == 2,
                      }"
                      @click="
                        immediately(scope.row.status, scope.row.declareUrl)
                      "
                      >{{ scope.row.status | SbStatus }}</span
                    >
                    <span
                      :class="
                        scope.row.subscrip === 0 ? 'subscribe' : 'onsubscribe'
                      "
                      @click="
                        subscribe3(scope.row.policyId, scope.row.subscrip)
                      "
                      >{{ scope.row.subscrip === 0 ? "订阅" : "已订阅" }}</span
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="block2">
            <el-pagination
              @current-change="handleCurrent3Change"
              layout="prev, pager, next, jumper"
              :page-size="8"
              :total="totalzx"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 最新政策//第二个tabpaner -->

        <!-- 最新公示名单 -->
        <el-tab-pane name="third">
          <template slot="label">
            <img
              style="vertical-align: middle !important"
              src="@/assets/personal/3448.png"
              alt=""
            />
            最新公示名单
          </template>
          <el-table
            v-if="activeName === 'third'"
            :data="newsqldata"
            style="
              width: 100%;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            "
            :header-cell-style="getclass"
          >
            <el-table-column prop="title" label="项目名称" width="280">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                  <div @click="selectpage(scope.row.policyId)">
                    {{ scope.row.year }}年{{ scope.row.title }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="立项部门" align="center" width="180">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.departmentName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="150"
              prop="areaName"
              align="center"
              label="地区"
            >
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.areaName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="publicNum"
              width="200"
              label="公示数量"
            >
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  {{ scope.row.publicNum }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="150" label="立项金额" align="center">
              <template slot-scope="scope">
                <div
                  v-show="scope.row.totalPrice != 0"
                  @click="selectpage(scope.row.policyId)"
                >
                  {{ scope.row.totalPrice | moneyFormTwo }}万元
                </div>
                <div
                  @click="selectpage(scope.row.policyId)"
                  v-show="scope.row.totalPrice == 0"
                >
                  未公开
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="批次">
              <template slot-scope="scope">
                <div @click="addmdxq(scope.row.policyId)">
                  {{ scope.row.batchNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="公示时间" align="center">
              <template slot-scope="scope">
                <div @click="selectpage(scope.row.policyId)">
                  <i class="el-icon-time" style="color: #6596ff"></i
                  >{{ scope.row.publicityTime | iosTime }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="block2">
            <el-pagination
              @current-change="handleCurrent4Change"
              layout="prev, pager, next, jumper"
              :page-size="8"
              :total="total3"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 最新公示名单 -->
      </el-tabs>
    </div>
    <div class="lastfooter"></div>
  </div>
</template>

<script>
import {
  getAreaList,
  getdepartment,
  getcategory,
  getproject,
  getsubject,
  getpolicy,
  getcalendar,
  getnewsPoli,
  getnewspl,
  getindustry,
  getqccsearch,
  getsubscribe,
  getPlList,
  deletepolicyId,
  getAllMoney,
  gethotlist
} from "@/utils/goverment.js";

import { getMatchDefault } from "@/utils/match.js";
import { log } from "util";
import { mapState } from "vuex";
// 导入mac冲突的时间格式处理插件
import moments from 'moment/moment'
export default {
  name: "government",
  data() {
    return {
      currentScroll: 0,
      hotlist: [],
      total6: 0,
      totalzcrl: 0,
      totalzx: 0,
      tonghanglist: [],
      activeName: "first",
      totaltx: 0,
      total: 0,
      total2: 0,
      total3: 0,
      spanIndex5: [],
      spanIndex4: [],
      spanIndex3: [],
      spanIndex2: [],
      spanIndex: [],
      catearr: [],
      devarr: [],
      proarr: [],
      sbjarr: [],
      diqulist: [],
      deplist: [],
      categorylist: [],
      projectlist: [],
      subjectlist: [],
      checkcolor1: "",
      checkcolor2: "",
      checkcolor3: "",
      checkcolor4: "",
      checkcolor5: "",
      checkcolor6: "",
      isShowIcon: true,
      isShowIcon2: true,
      horform: {
        pageNum: 1,
        pageSize: 6,
        sortNum: 5,
      },
      tableData: [],
      yearlist: [
        { id: 2017, year: "2017年" },
        { id: 2018, year: "2018年" },
        { id: 2019, year: "2019年" },
        { id: 2020, year: "2020年" },
        { id: 2021, year: "2021年" },
      ],
      queyform: {
        areaCode: "",
        categoryIds: "",
        departmentIds: "",
        pageNum: 1,
        pageSize: 8,
        projectIds: "",
        subjectIds: "",
        title: "",
        year: "",
      },
      querybuwei: {
        areaCode: "",
      },
      calendarquery: {
        pageNum: 1,
        pageSize: 8,
      },
      newsquery: {
        pageNum: 1,
        pageSize: 8,
      },
      newsqlquery: {
        pageNum: 1,
        pageSize: 8,
      },
      catedata: [],
      // hotlist: [],
      // 默认同行
      queryindustry: {
        pageNum: 1,
        pageSize: 8,
      },
      tonghang: "",
      restaurants: [],
      newsdata: [],
      newsqldata: [],
      mingdanList: [],
      querybuw: {
        pageNum: 1,
        pageSize: 8,
        areaCode: "",
      },
      showMindan: true,
      queyformdan: {
        areaCode: "",
        categoryIds: "",
        departmentIds: "",
        pageNum: 1,
        pageSize: 8,
        projectIds: "",
        subjectIds: "",
        title: "",
        year: "",
      },
      totalmd: 0,
      zihangye: [],
      hangyecoids: [],
      totlaprice: {},
      spanw1: "",
      spanw2: "",
      spanw3: "",
      spanw4: "",
      spanw5: "",
      scrollY: 0,
      currentScroll: 0,
      horform: {
        sortNum: 5,
      },
    };
  },
  created() {
    this.getarealist();
  },
  filters: {
    ellipsisaaa(value) {
      if (!value) return "";
      if (value.length > 7) {
        return value.slice(0, 8) + "...";
      }
      return value;
    },
    wanyuan(val) {
      return Math.trunc(val / 10000);
    },
    SbStatus(val) {
      // console.log(val);
      switch (val) {
        case "0":
          return "已截止";
        case "1":
          return "申报中";
        case "2":
          return "待开放";
      }
    },
    SbStatus(val) {
      // console.log(val);
      switch (val) {
        case "0":
          return "已截止";
        case "1":
          return "申报中";
        case "2":
          return "待开放";
      }
    },
    iosTime(val){
      return moments(val).format('YYYY/MM/DD ')
    },
    ellipsis(value) {
      if (!value) return "";
      let val = value.replace(/<p>/g, "");
      if (val.length > 20) {
        return val.slice(0, 20) + "...";
      }
      return val;
    },
    ellipsishot(value) {
      if (!value) return "";
     
      if (value.length > 8) {
        return value.slice(0, 8) + "...";
      }
      return value;
    },
    ellipsistj(value) {
      if (!value) return "";
      let val = value.replace(/<p>/g, "");
      if (val.length > 10) {
        return val.slice(0, 10) + "...";
      }
      return val;
    },
  },
  mounted() {
    this.getHotlistmwthos()
    // console.log(this.$store.state.hotlist,"取出");
    // this.gethotserch()
    this.btnishow();
    this.$refs.alldiqu.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    this.$refs.xm.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    this.$refs.allbuwei.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    this.$refs.hangye.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    this.$refs.nf.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    this.$refs.zt.style =
      "background-color: #256bff;color:#fff;border-radius:5px;";
    
  },
  activated() {
    // this.getHotlistmwthos()
    // 政策查询后的缓存更新
    getpolicy(this.queyform).then((res) => {
      this.tableData = res.rows;
      this.total = res.total;
    });
    // 日历缓存后查询
    getcalendar(this.calendarquery).then((res) => {
      this.catedata = res.rows;
      console.log(this.catedata, "政策日历");
      this.totalzcrl = res.total;
    });
    // 最新政策的缓存更新
    getnewsPoli(this.newsquery).then((res) => {
      this.newsdata = res.rows;
      // console.log(this.newsdata,"最新政策");
      this.totalzx = res.total;
    });
   
  },
  methods: {
    // 热搜查询
    async getHotlistmwthos(){
      const {data: res} =await gethotlist(this.horform)
        this.hotlist= res
          this.spanw1 = `${Math.floor(res[0].scale)}%`;           
          this.spanw2 = `${Math.floor(res[1].scale)}%`;
          this.spanw3 = `${Math.floor(res[2].scale)}%`;
          this.spanw4 = `${Math.floor(res[3].scale)}%`;
          this.spanw5 = `${Math.floor(res[4].scale)}%`;
    },
    // 跳转到名单详情
    addmdxq(id) {
      this.currentScroll = this.$refs.geduan.offsetTop;
      this.$store.commit("getScrol", "geduan");
      this.$router.push({ path: "mingdaninfo", query: { id: id } });
    },
    // 跳转到名单
    routermd() {
      this.showMingdan();
      this.$refs.twospan.style = "color:#4cabff;";
      this.$refs.onelogo.style = "color:#333;";
      this.showMindan = false;
    },
    // 跳转到政策
    routerzc() {
      this.$refs.twospan.style = "color:#333;";
      this.$refs.onelogo.style = "color:#4cabff;";
      this.showMindan = true;
    },
    showMingdan() {
      // 地区查询
      // this.showtab = false;
      getPlList(this.queyformdan).then((res) => {
        console.log(res, "查询名单的信息");
        this.mingdanList = res.rows;
        this.totalmd = res.total;
      });
    },
    async querySearch(queryString, cb) {
      //这里是从后台获取数据渲染同行查询联想页
      await getqccsearch(queryString).then((res) => {
        this.restaurants = res.data;
        var restaurants = this.restaurants;
        console.log(this.restaurants, "后台公司名字");
        cb(restaurants);
      });
    },
    getarealist() {
      // 查询所有的补贴
      getAllMoney().then((res) => {
        console.log(res, "所有的年份的补贴");
        this.totlaprice = res.data;
      });
      console.log(this.hotlist, "这是一段内容");

      // 地区查询
      getAreaList().then((res) => {
        console.log(res);
        this.diqulist = res.rows;
        console.log(this.diqulist, "department");
      });
      // 部委查询
      getdepartment(this.querybuw).then((res) => {
        this.deplist = res.rows;
        console.log(this.deplist, "部委查询");
      });
      // 行业查询
      getcategory().then((res) => {
        this.categorylist = res.rows;
        console.log(this.categorylist, "行业");
      });
      // 项目查询
      getproject().then((res) => {
        // console.log(res);
        this.projectlist = res.rows;
      });

      // 主体查询
      getsubject().then((res) => {
        this.subjectlist = res.rows;
      });

      // 政策查询
      // getpolicy(this.queyform).then((res) => {
      //   this.total = res.total;
      //   this.tableData = res.rows;
      //   // console.log(this.tableData,'表格列表');
      //   console.log(this.tableData, "第一个列表");
      // });
      // 政策日历查询 getcalendar
      // getcalendar(this.calendarquery).then((res) => {
      //   this.catedata = res.rows;
      //   console.log(this.catedata, "政策日历");
      //   this.totalzcrl = res.total;
      // });
      // 同行默认查询
      getindustry(this.queryindustry).then((res) => {
        this.totaltx = res.total;
        this.tonghanglist = res.rows;
      });

      // getnewsPoli(this.newsquery).then((res) => {
      //   this.newsdata = res.rows;
      //   console.log(res, "最新政策");
      //   this.totalzx = res.total;
      //   console.log(this.totalzx, "最新页数");
      // });
    },
    // 查询企业信息保存并跳转
    selectcompany() {
      // console.log(this.tonghang,"同行名字");
      if (this.tonghang.trim() == "")
        return this.$message.warning("请输入公司名字");
      // console.log(this.restaurants,"后台公司名字");
      getMatchDefault(this.tonghang).then((res) => {
        const compenylist = res.data;
        if (compenylist.name) {
          this.$router.push({
            path: "suggesres",
            query: { username: this.tonghang },
          });
        } else {
          this.$message.warning("请输入公司完整的名字");
        }
      });
    },
    selectcopeny2(name) {
      this.$router.push({
        path: "suggesres",
        query: { username: name },
      });
    },
    tabclick2(tab, event) {
      if (tab.name === "second") {
        getnewsPoli(this.newsquery).then((res) => {
          this.newsdata = res.rows;
          console.log(res, "最新政策");
          this.totalzx = res.total;
          console.log(this.totalzx, "最新页数");
        });
      }
      if (tab.name === "third") {
        console.log("2");
        getnewspl(this.newsqlquery).then((res) => {
          // console.log(res, "最新公示");
          this.newsqldata = res.rows;
          this.total3 = res.total;
        });
      }
    },
    handleCurrent4Change(val) {
      this.newsqlquery.pageNum = val;
      getnewspl(this.newsqlquery).then((res) => {
        // console.log(res, "newspl");
        this.newsqldata = res.rows;
        this.total3 = total;
      });
    },
    handleCurrent2Change(val) {
      this.calendarquery.pageNum = val;
      getcalendar(this.calendarquery).then((res) => {
        this.catedata = res.rows;
        console.log(this.catedata, "政策日历");
        this.totalzcrl = res.total;
      });
    },
    handleCurrent3Change(val) {
      this.newsquery.pageNum = val;
      getnewsPoli(this.newsquery).then((res) => {
        this.newsdata = res.rows;
        // console.log(this.newsdata,"最新政策");
        this.totalzx = res.total;
      });
    },
    selectTitle() {
      /// 政策查询
      // if(this.queyform.title=="") return
      if (this.showMindan === true) {
        if (this.queyform.year == "")
          getpolicy(this.queyform).then((res) => {
            this.total = res.total;
            this.tableData = res.rows;
          });
      } else {
        if (this.queyform.year == "")
        this.queyformdan.title = this.queyform.title;
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    changeSpan(index, id) {
      // 清空样式
      console.log(
        this.queyform.departmentIds,
        "a",
        this.queyformdan.departmentIds,
        "b",
        "第一步"
      );
      this.$refs.allbuwei.style = "";
      let arrIndex = this.spanIndex.indexOf(id);
      // console.log(arrIndex);
      if (arrIndex > -1) {
        this.spanIndex.splice(arrIndex, 1);
      } else {
        this.spanIndex.push(id);
      }
      // console.log(this.spanIndex);
      const newarr = this.spanIndex;
      this.queyform.departmentIds = newarr.join(",");
      this.queyformdan.departmentIds = newarr.join(",");
      console.log(this.queyform.departmentIds, "第二步");
      // console.log(this.queyform);
      // 政策查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      // 名单查询
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    changeSpanhangye(id) {
      this.$refs.hangye.style = "";
      let arrIndex = this.spanIndex2.indexOf(id);
      if (arrIndex > -1) {
        this.spanIndex2.splice(arrIndex, 1);
      } else {
        this.spanIndex2.push(id);
      }
      this.hangyecoids = [...this.spanIndex5, ...this.spanIndex2];
      const newarr2 = this.spanIndex2;
      this.queyform.categoryIds = this.hangyecoids.join(",");

      let newARR = [];
      this.categorylist.forEach((item) => {
        // console.log(item);
        for (let i = 0; i < newarr2.length; i++) {
          if (item.categoryId == newarr2[i]) {
            newARR.push(...item.children);
          }
        }
      });
      // 赋值处理过以后的数据
      this.zihangye = newARR;
      // console.log(newARR,"处理过以后的数据");

      // console.log(this.categorylist,"子行业");
      // 政策的行业的查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      this.queyformdan.categoryIds = this.hangyecoids.join(",");
      // 名单的行业查询
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    //////////////////////////////////////////////////////////////
    // 切换子行业
    changeSonhangye(id) {
      let arrIndex = this.spanIndex5.indexOf(id);
      if (arrIndex > -1) {
        this.spanIndex5.splice(arrIndex, 1);
      } else {
        this.spanIndex5.push(id);
      }

      let fatherArr = this.queyform.categoryIds.split(",");
      //  const newar=fatherArr.push([...this.spanIndex5])
      this.hangyecoids = [...this.spanIndex5, ...this.spanIndex2];
      // 政策的行业的查询
      this.queyform.categoryIds = this.hangyecoids.join(",");
      //  console.log(this.queyform.categoryIds,"行业的数组");
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
          console.log(res);
        });
      }
      this.queyformdan.categoryIds = this.hangyecoids.join(",");
      // 名单的行业查询
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    changeSpanxm(id) {
      this.$refs.xm.style = "";
      let arrIndex = this.spanIndex3.indexOf(id);
      if (arrIndex > -1) {
        this.spanIndex3.splice(arrIndex, 1);
      } else {
        this.spanIndex3.push(id);
      }
      const newarr3 = this.spanIndex3;
      this.queyform.projectIds = newarr3.join(",");
      console.log(this.queyform);
      // 政策的查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      this.queyformdan.projectIds = newarr3.join(",");
      // 名单的查询
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    clickarea(idx, name) {
      this.queyform.departmentIds = "";
      this.queyformdan.departmentIds = "";
      console.log(name, "name");
      this.querybuwei.areaCode = name;
      this.checkcolor1 = idx;
      this.$refs.alldiqu.style = "";
      this.queyform.areaCode = name;
      // 政策查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          console.log(res);
          this.total = res.total;
          this.tableData = res.rows;
        });
      }
      // 部委查询
      console.log(this.querybuwei.areaCode);
      getdepartment(this.querybuwei).then((res) => {
        this.deplist = res.rows;
      });
      // 地区查询
      this.queyformdan.areaCode = name;
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    clickcate(idx, name) {
      if (this.catearr.includes(idx)) {
        return this.$message.error("不能重复选择");
      }
      let arr = this.catearr.push(idx);
      // console.log(this.catearr);
      this.queyform.categoryIds = arr;
      // 政策查询
      getpolicy(this.queyform).then((res) => {
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    changeSpanxzt(id) {
      this.$refs.zt.style = "";
      let arrIndex = this.spanIndex4.indexOf(id);
      if (arrIndex > -1) {
        this.spanIndex4.splice(arrIndex, 1);
      } else {
        this.spanIndex4.push(id);
      }
      const newarr4 = this.spanIndex4;
      this.queyform.subjectIds = newarr4.join(",");
      // 查询政策主体
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.total = res.total;
          this.tableData = res.rows;
        });
      }
      // 查询名单主体
      this.queyformdan.subjectIds = newarr4.join(",");
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 年份的全部
    allnf() {
      this.$refs.nf.style = "background-color: #256bff;color:#fff;";
      this.checkcolor6 = "";
      this.queyform.year = "";
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }

      // 查询名单年份的全部
      this.queyformdan.year = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 主体的全部
    allzt() {
      this.spanIndex4 = [];
      this.queyform.subjectId = "";
      this.$refs.zt.style =
        "background-color: #256bff;color:#fff;border-radius:5px;";
      console.log(this.queyform, "全部");
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }

      // 查询名单的主体
      this.queyformdan.subjectId = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 地区的全部
    allqiqu() {
      getdepartment().then((res) => {
        this.deplist = res.rows;
      });

      this.queyform.areaCode = "";
      this.checkcolor1 = 0;
      this.$refs.alldiqu.style =
        "background-color: #256bff;color:#fff;border-radius:5px;";
      // 政策查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      // 名单查询
      this.queyformdan.areaCode = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 项目的全部
    allxm() {
      this.queyform.projectIds = "";
      this.spanIndex3 = [];
      this.$refs.xm.style =
        "background-color: #256bff;color:#fff;border-radius:5px;";

      // 政策查询 项目的查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }

      // 名单查询
      this.queyformdan.projectIds = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 部委的全部
    allbuwei() {
      // this.querybuw.pageSize=""
      //       this.querybuw.pageNum=""
      //       getdepartment(this.querybuw).then(res => {
      //         this.deplist = res.rows;
      //       })
      //  this.checkcolor1 = 0;
      this.queyform.departmentIds = "";
      this.spanIndex = [];
      // console.log(this.spanIndex);
      this.$refs.allbuwei.style =
        "background-color: #256bff;color:#fff;border-radius:5px;";

      // 政策查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      // 名单查询
      this.queyformdan.departmentIds = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    // 行业的全部
    allhangye() {
      this.queyform.categoryIds = "";
      this.spanIndex2 = [];
      this.spanIndex5 = [];
      this.zihangye = [];
      this.hangyecoids = [];
      this.$refs.hangye.style =
        "background-color: #256bff;color:#fff;border-radius:5px;";
      console.log(this.queyform);
      // 政策的查询
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
      // 名单的查询
      this.queyformdan.categoryIds = "";
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    //下拉加载更多
    btnishow() {
      this.isShowIcon = !this.isShowIcon;
      if (this.isShowIcon === true) {
        // this.$refs.liref.style = "height:108.5px;";
        this.$refs.changehyH.style =
          "height:100%; border-bottom: 1px solid #efefef;padding-bottom:10px;";
        // 点击加载更多部位
        if (this.checkcolor1 == 0) {
          this.querybuw.pageSize = "";
          this.querybuw.pageNum = "";
          getdepartment(this.querybuw).then((res) => {
            this.deplist = res.rows;
          });
        }
      } else {
        this.$refs.changehyH.style =
          "overflow: hidden;height:40px; border-bottom: 1px solid #efefef;";
      }
    },
    clickyear(id) {
      this.checkcolor6 = id;
      this.queyform.year = id;
      this.$refs.nf.style = "";
      // 政策查询
      console.log(this.queyform);
      if (this.showMindan === true) {
        getpolicy(this.queyform).then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
      }

      // 查询名单的全部
      this.queyformdan.year = id;
      if (this.showMindan === false) {
        getPlList(this.queyformdan).then((res) => {
          console.log(res, "查询名单的信息");
          this.mingdanList = res.rows;
          this.totalmd = res.total;
        });
      }
    },
    handleCurrentChange(val) {
      this.queyform.pageNum = val;
      getpolicy(this.queyform).then((res) => {
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
    handleCurrentChangemd(val) {
      this.queyformdan.pageNum = val;
      getPlList(this.queyformdan).then((res) => {
        console.log(res, "查询名单的信息");
        this.mingdanList = res.rows;
        this.totalmd = res.total;
      });
    },
    handleCurrentChangetx(val) {
      this.queryindustry.pageNum = val;
      getindustry(this.queryindustry).then((res) => {
        console.log(res);
        this.totaltx = res.total;
        this.tonghanglist = res.rows;
      });
    },
    // 点击进入项目详情
    selectpage(id) {
      this.$router.push({ path: "policydetails", query: { id: id } });
      console.log(id);
    },
    // 点击进入热搜榜单
    hotlick(id) {
      this.$router.push({ path: "hotsearch", query: { id: id } });
      console.log(id, "热搜");
    },
    // 点击dingyue
    subscribe(id, sid) {
      console.log(id, sid);
      if (sid === 1) {
        deletepolicyId(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("取消订阅成功");
            getpolicy(this.queyform).then((res) => {
              this.total = res.total;
              this.tableData = res.rows;
              // console.log(this.tableData,'表格列表');
              console.log(this.tableData, "第一个列表");
            });
          }
        });
      } else if (sid === 0) {
        getsubscribe(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("订阅成功");
            getpolicy(this.queyform).then((res) => {
              this.total = res.total;
              this.tableData = res.rows;
              // console.log(this.tableData,'表格列表');
              console.log(this.tableData, "第一个列表");
            });
          }
        });
      }
    },
    subscribe2(id, sid) {
      if (sid === 1) {
        deletepolicyId(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("取消订阅成功");
            getcalendar(this.calendarquery).then((res) => {
              this.catedata = res.rows;
              this.total6 = res.total;
            });
          }
        });
      } else if (sid === 0) {
        getsubscribe(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("订阅成功");
            getcalendar(this.calendarquery).then((res) => {
              this.catedata = res.rows;
              this.total6 = res.total;
            });
          }
        });
      }
    },
    subscribe3(id, sid) {
      if (sid === 1) {
        deletepolicyId(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("取消订阅成功");
            getnewsPoli(this.newsquery).then((res) => {
              this.newsdata = res.rows;
              // console.log(this.newsdata,"最新政策");
              this.totalzx = res.total;
            });
          }
        });
      } else if (sid === 0) {
        getsubscribe(id).then((res) => {
          if (res.code === 200) {
            this.$message.success("订阅成功");
            // getcalendar
            getnewsPoli(this.newsquery).then((res) => {
              this.newsdata = res.rows;
              // console.log(this.newsdata,"最新政策");
              this.totalzx = res.total;
            });
          }
        });
      }
    },
    immediately(status, url) {
      console.log(url);
      // if (status == 1) {
      //   // if (url.indexOf("http") == -1 && url.indexOf("www") == -1)
      //   // console.log(this.piciurl.indexOf("www"));
      //   if (url.indexOf("www") != -1 && url.indexOf("http") == -1) {
      //     window.open("http://" + url, "_blank");
      //   } else if (url.indexOf("http") != -1) {
      //     window.open(url, "_blank");
      //   }
      // }
       if (url.indexOf("http") == -1) {
          window.open("https://" + url, "_blank");
        } else {
          window.open(url, "_blank");
        }
    },
    getclass({ row, column, rowIndex, columnIndex }){
      return "background-color: #e4eeff;font-size: 14px;height: 69px; font-family: Microsoft YaHei;font-weight: bold;color: #0453fa !important;"
    }
  },
};
</script>

<style lang="less" scoped>
.navleft {
  width: 75%;
  margin-bottom: 20px;
  padding: 20px;
  float: left;
  border: 1px solid #efefef;
  .iptfind {
    position: relative;
    span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    .onelogo {
      position: absolute;
      top: 13px;
      left: -6px;
      margin-left: 20px;
      padding-left: 20px;
      cursor: pointer;
    }
    .loge1 {
      position: relative;
      // padding-top: 10px;
      width: 25px;
      height: 25px;
      background-color: #4cabff;
      border-radius: 50%;
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 15px;
        height: 15px;
      }
    }
    .loge2 {
      position: absolute;
      top: 0px;
      left: 190px;
    }
    .twospan {
      position: absolute;
      top: 12px;
      left: 222px;
      cursor: pointer;
    }
  }
}
.naveight {
  width: 24%;
}
/deep/.iconfont {
  color: white !important;
  background: #5689ff !important;
}
.diqu {
  width: 100%;
  margin-top: 16px;
  // height: 30px;
  // padding-bottom: 20px;
  // height: 300px;
  span {
    margin-top: 18px;
    float: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  ul {
    margin-left: 30px;
    // width: 1150px;
    width: 100%;
    padding-right: 100px;
    li {
      float: left;
      padding: 10px;
      cursor: pointer;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      margin-left: 2px !important;
      margin-top: 2px !important;
    }
    .active {
      background-color: #256bff;
      color: white;
      border-radius: 2px;
    }
  }
}
.hangye {
  float: left;
  // overflow: hidden;
  // height: 40px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-top: 10px;
  // height: 56px;
  // height: 45px!important;
  ul {
    li {
      //  white-space:nowrap;
      //  display:block;
      // margin: 5px 2px;
      line-height: 10px;
      margin-left: 2px !important;
    }
  }
}
.btnshow {
  position: relative;
  float: right;
  width: 50px;
  height: 20px;
  margin-top: 10px;
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #2a6af2;
  background-color: #fff;
  text-align: center;
  /deep/span {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
.diuqsty {
  // border-bottom: 1px solid #efefef;
  height: 40px;
  ul {
    li {
      line-height: 10px;
      margin-bottom: 10px;
    }
  }
}
.buwei {
  height: 50px;
  padding-top: 35px;
  // border-bottom: 1px solid #efefef;
  span {
    margin-top: 18px;
  }
  ul {
    word-wrap: break-word;
    word-break: break-all;
    li {
      // margin: 10px 0;
      float: left;
      line-height: 10px;
    }
  }
}
.xiangmu {
  // height: 40px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding-top: 10px;
}
.year {
  height: 40px !important;
  border-top: 1px solid #efefef;
  // border-bottom: 1px solid #efefef;
  margin-top: 0px;
  width: 100%;
  float: left;
  span {
    margin-top: 25px;
  }
  ul {
    margin-top: 10px;
    li {
      line-height: 10px;
    }
  }
}
.naveight {
  float: right;
  margin-left: 1%;
  // padding: 20px !important;
  h1 {
    width: 100%;
    height: 30px;
    padding-left: 20px;
    span {
      vertical-align: middle;
      font-size: 15px;
    }
    img {
      // margin-top: 20px;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
}
.yanse {
  height: 20px;
  margin-top: 30px;
  padding: 0 10px;
  margin-left: 17px;
  width: 93%;
  div {
    // display: block;
    float: left;
    height: 10px;
    width: 20%;
    float: left;
    &:first-child {
      //  border-left-radius: 5%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      // width: 20%;
      background-color: #ff8e2b;
    }
    &:nth-child(2) {
      // width: 20%;
      background-color: #fdde35;
    }
    &:nth-child(3) {
      // width: 20%;
      background-color: #24db94;
    }
    &:nth-child(4) {
      // width: 20%;
      background-color: #f13838;
    }
    &:nth-child(5) {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      // width: 20%;
      background-color: #38c0f1;
    }
  }
}
.pingfen {
  ul {
    li {
      width: 100%;
      height: 35px;
      // 108.5
      line-height: 12px;
      margin-top: 38px;
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      cursor: pointer;
      position: relative;

      // img {
      //   position: absolute;
      //   top: 1px;
      //   left: 1px;
      //   width: 12px;
      //   height: 12px;
      //   vertical-align: middle;
      // }
      i{
        display: block;
        float: left;
        width: 12px;
        height: 12px;
        background: url(../../../../assets/indexlogo/pc1.png);
        background-size: cover;
      }
      &:nth-child(2){
        i{
           background: url(../../../../assets/indexlogo/pc2.png);
            background-size: cover;
        }
      }
       &:nth-child(3){
        i{
        background: url(../../../../assets/indexlogo/pc3.png);
            background-size: cover;
        }
      }
       &:nth-child(4){
        i{
           background: url(../../../../assets/indexlogo/pc4.png);
            background-size: cover;
        }
      }
       &:nth-child(5){
        i{
           background: url(../../../../assets/indexlogo/pc5.png);
            background-size: cover;
        }
      }
    }
  }
}
.selectlist {
  padding-top: 100px;
  text-align: center !important;
}

.bgcolor {
  background-color: #256bff !important;
  color: white !important;
  border-radius: 5px;
}
.block {
  position: relative;
  margin-top: 20px;
  .el-pagination {
    position: absolute;
    left: 48%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
.geduan {
  height: 400px !important;
}
.btnsds {
  position: relative;
  // width: 150px;
  // margin: 0 auto;
  span {
    display: block;
    float: left;
    width: 50px;
    height: 26px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 26px;
    color: #ffffff;
    cursor: pointer;
  }
  .immediately {
    background-color: #fb963e;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
  .immediatelyNo {
    background-color: #ffd6b1;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
  .immed {
    background-color: #fb3e3e;
    border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
  }
  .subscribe {
    border-top-right-radius: 5%;
    border-bottom-right-radius: 5%;
    background-color: #7a96ed;
  }
}

.peers {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // height: 618px;
  padding: 20px;
  margin-top: 80px;
  box-shadow: 0 5px 20px 0 #d7dade;
  .peerstop {
    position: relative;
    height: 100px;
    .peerstitle {
      // float: left;
      position: absolute;
      top: 25px;
      margin-top: 10px;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .findinput {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        margin-top: 20px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 16px;
        color: #333;
        span {
          color: #0453fa;
          font-weight: 600;
        }
      }
    }
  }
  .peersmain {
    // width: 1300px;
    // width: 100%;
    margin: 0 auto;
    // height: 410px;
    overflow: hidden;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // float: left;
    // margin-top: 24px;
    // margin-left: 5%;
    // margin: 0 auto;
    .peerscard {
      cursor: pointer;
      width: 305px;
      height: 160px;
      border: 1px solid #f1f1f1;
      margin: 5px 8px;
      .namelogo {
        float: left;
        width: 20%;
        height: 37%;
        margin-top: 25px;
        margin-left: 25px;
        background-color: #f47e7e;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 55px;
        text-align: center;
        color: #ffffff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        width: 60%;
        float: left;
        margin-left: 12px;
        margin-top: 20px;
        li {
          line-height: 21px;
          &:first-child {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
          }
          span {
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            // line-height: 14px;
            &:first-child {
              color: #9f9f9f;
            }
            &:last-child {
              color: #4e4e4e;
            }
            &:nth-child(2) {
              span {
                margin: 5px 0;
              }
            }
          }
          &:last-child {
            span {
              &:last-child {
                font-size: 10px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                line-height: 14px;
                color: #0453fa;
              }
            }
          }
        }
      }
    }
    > i {
      width: 305px;
      margin: 5px 8px;
    }
  }
  h1 {
    width: 610px;
    height: 19px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    opacity: 1;
    margin: 0 auto;
    span {
      color: #0453fa;
    }
  }
}
.divcss {
  display: table;
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  // line-height: 18px;
  color: #e05a48 !important;
  height: 18px;
  border: 1px solid #ec9f94;
  padding: 0px 2px;
  border-radius: 5px;
  margin: 3px 0;
}
// 一些饿了么的公共样式
.footer {
  margin-top: 30px;
  .el-tabs__nav-wrap::after {
    height: 0px;
    /* background-color: #E4E7ED; */
  }
  /deep/.el-tabs__item {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
    position: relative;
  }
  /deep/.el-tabs__item.is-active {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #409eff !important;
  }
  // /deep/.el-tabs__active-bar {
  //   // background-color: #f47e7e;
  // }
}
.block2 {
  margin-top: 20px;
  text-align: center;
  // position: relative;
  // height: 100px;
  // .el-pagination {
  //   position: absolute;
  //   left: 48%;
  //   -webkit-transform: translateX(-50%);
  //   transform: translateX(-50%);
  // }
}
// // /deep/.el-card__body {
// //   // padding: 3px;
// // }
// .block3 {
//   // position: absolute;
//   // top: 530px;
//   // left: 48%;
//   // transform: translateX(-50%);
// }
/deep/.el-table td div {
  height: 28px!important;
  // box-sizing: border-box!important;
  // white-space: nowrap!important;
  // text-overflow: ellipsis!important;
  // overflow: hidden!important;
  // p:first-child{
  //   white-space: nowrap!important;
  // text-overflow: ellipsis!important;
  // overflow: hidden!important;
  // }
}
.onsubscribe {
  background-color: #d2dcfa;
  color: white;
}
.el-dialog__header {
  height: 55px;
}
.zhuti {
  
  ul {
    li {
      padding: 10px 10px;
      margin: 10px 0;
    }
  }
}
li {
  margin-left: 2px !important;
}

/deep/.el-input-group__append {
  border-right: 0;
  border-top: 0;
  border-left: 0;
}
/deep/.el-table tr td:first-child>.cell:first-child {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
  cursor: pointer;
  // width: 280px;
}

// /deep/.el-table tr td:nth-child(2)>.cell:first-child {
//   // box-sizing: border-box;
//   width: 180px;
// }
// /deep/.el-table tr td:nth-child(3)>.cell:first-child {
//   // box-sizing: border-box;
//   width: 100px;
// }
// /deep/.el-table tr td:nth-child(4)>.cell:first-child {
//   // box-sizing: border-box;
//   width: 230px;
// }
// /deep/.el-table tr td:nth-child(5)>.cell:first-child {
//   // box-sizing: border-box;
//   width: 600px;
// }
// .el-table > .success-row td {
//   background: #e4eeff !important;
//   cursor: pointer !important;
// }
// /deep/.el-table /deep/thead > tr:first-child th {
//   background: rgb(240, 240, 240) !important;
// }
// /deep/.el-table /deep/thead > tr:last-child th {
//   background-color: #e4eeff !important;
//   height: 69px;
//   font-size: 14px;
// font-family: Microsoft YaHei;
// font-weight: bold;
// color: #0453fa !important;
//   text-align: center;
// }
.block3 {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.buweiall{
  // height: 55px!important;
  border-top: 1px solid #efefef;
  padding-bottom: 43px;

}
/deep/.el-table__header,/deep/.el-table__body,/deep/.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}
.text-container {
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    &:before {
        content: ''!important;
        display: block!important;
    }
    }
    .btnssearch{
      border-top-left-radius: 0!important;
      border-bottom-left-radius: 0!important;
      border-bottom: none!important;
      border-top:none!important;
    }
    /deep/.el-button{
      line-height: normal!important;
    }
</style>
<style lang="less">

.el-tooltip__popper{
    max-width:50%!important;
    min-width:none!important;
    // float: left;
    // writing-mode:horizontal-tb;
    // --webkit-max-width:50%!important;
    }
.popperclass{
  background-color: #303133!important;
  color: white!important;
  font-size: 12px!important;
}
.el-popper .popper__arrow::after{
  border: 0;
  // background-color: #303133;
  // border-top-color: #303133!important;
  // border-bottom-color: #303133!important;
}
</style>
