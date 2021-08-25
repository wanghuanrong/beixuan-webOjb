<template>
  <div class="match">
    <div class="maodian" ref="shopMainMain"></div>
    <el-card>
      <el-steps class="headmath" ref="headmath" :active="active">
        <el-step title="企业基本信息" icon="el-icon-edit"> </el-step>
        <el-step title="专项信息" icon="el-icon-upload"></el-step>
        <el-step title="辅助信息" icon="el-icon-picture"></el-step>
      </el-steps>

      <!-- 第一块面板 -->
      <!-- 第一版块 -->
      <div v-show="active === 0">
        <div class="formmainone" v-show="showDatadisa">
          <!-- 上传Excel文件按钮(第一级) -->
          <div class="excelBtn" @click="excelClick(true)">上传文件</div>
          <div class="modelBtn" @click="modelFileClick">模板下载</div>
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
          >
            <h1 class="matchTitleone">
              <i></i>企业基本信息<span>(系统已为您载入部分信息)</span>
            </h1>
            <el-row
              class="topmatch"
              type="flex"
              justify="space-around"
              align="top"
            >
              <el-col :span="6">
                <el-form-item prop="adddate">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册时间</span>
                  </template>
                  <el-date-picker
                    :append-to-body="false"
                    v-model="formData.adddate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    placeholder="请选择日期"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="addaddress">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册地址</span>
                  </template>
                  <el-input
                    v-model="formData.addaddress"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="capital">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册资本</span>
                  </template>
                  <el-input
                    placeholder="请输入注册资本"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    v-model="formData.capital"
                    maxlength="11"
                  >
                    <template slot="append">{{ wanyuandanwei }}</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="addmain">
                  <template slot="label">
                    <span style="color: red">*</span><span>请选择主体</span>
                  </template>
                  <!-- clearable -->
                  <el-select
                    v-model="formData.addmain"
                    placeholder="请选择下拉选择"
                    :style="{ width: '100%' }"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in subjectList"
                      :label="item.subjectName"
                      :key="item.subjectId"
                      :value="item.subjectId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="industry">
                  <template slot="label">
                    <span style="color: red">*</span><span>行业</span>
                  </template>
                  <el-cascader
                    :append-to-body="false"
                    v-model="formData.industry"
                    :options="categoryList"
                    :props="field108Props"
                    :style="{ width: '100%' }"
                    placeholder="请选择行业"
                    @change="changese"
                    collapse-tags
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <template slot="label">
                    <span style="color: red">*</span>分支机构数</template
                  >
                  <el-input-number
                    :min="0"
                    v-model="formData.branch"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="employees">
                  <template slot="label"
                    ><span style="color: red">*</span>职工人数</template
                  >
                  <el-input
                    v-model="formData.employees"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    clearable
                    :style="{ width: '100%' }"
                    @input="inputtest"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="overseas">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>留学归国人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.overseas"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="masterStudy">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>硕士及以上人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.masterStudy"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 60px; width: 100%"
                  prop="juniorcollege"
                >
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>大专及以上人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.juniorcollege"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 190px; width: 100%"
                  prop="development"
                >
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -15px;
                      "
                      ><span style="color: red">*</span>研发/技术人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.development"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    maxlength="10"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="officespace">
                  <template slot="label"
                    ><span style="color: red">*</span>办公面积
                  </template>
                  <el-input
                    placeholder="请输入办公面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.officespace"
                    maxlength="10"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="officebuilding">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>购置办公用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输办公用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.officebuilding"
                    maxlength="10"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="research">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>科研用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输入科研用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.research"
                    maxlength="10"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 60px; width: 100%"
                  label="*经营面积"
                  prop="management"
                >
                  <el-input
                    placeholder="请输入经营面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.management"
                    maxlength="10"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 190px; width: 100%"
                  prop="hireoffice"
                  ><template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>租赁办公用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输入租赁办公用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.hireoffice"
                    maxlength="10"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- 第一个版块第二次不能填写 -->
        <div class="formmainone" v-show="showDatadisa == false">
          <!-- 上传Excel文件按钮 -->
          <div class="excelBtn" @click="excelClick(false)">上传文件</div>
          <div class="modelBtn" @click="modelFileClick">模板下载</div>
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
          >
            <h1 class="matchTitleone">
              <i></i>企业基本信息<span>(系统已为您载入部分信息)</span>
            </h1>
            <el-row
              class="topmatch"
              type="flex"
              justify="space-around"
              align="top"
            >
              <el-col :span="6">
                <el-form-item prop="adddate" :required="true">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册时间</span>
                  </template>
                  <el-date-picker
                    :append-to-body="false"
                    v-model="formData.adddate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    placeholder="请选择日期"
                    clearable
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="addaddress">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册地址</span>
                  </template>
                  <el-input
                    v-model="formData.addaddress"
                    clearable
                    :style="{ width: '100%' }"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="capital">
                  <template slot="label">
                    <span style="color: red">*</span><span>注册资本</span>
                  </template>
                  <el-input
                    placeholder="请输入注册资本"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    v-model="formData.capital"
                    :disabled="true"
                  >
                    <template slot="append">{{ wanyuandanwei }}</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="addmain">
                  <template slot="label">
                    <span style="color: red">*</span><span>请选择主体</span>
                  </template>
                  <el-select
                    v-model="formData.addmain"
                    placeholder="请选择下拉选择"
                    clearable
                    :style="{ width: '100%' }"
                    :popper-append-to-body="false"
                    disabled
                  >
                    <el-option
                      v-for="item in subjectList"
                      :label="item.subjectName"
                      :key="item.subjectId"
                      :value="item.subjectId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="industry">
                  <template slot="label">
                    <span style="color: red">*</span><span>行业</span>
                  </template>
                  <el-cascader
                    disabled
                    :append-to-body="false"
                    v-model="formData.industry"
                    :options="categoryList"
                    :props="field108Props"
                    :style="{ width: '100%' }"
                    placeholder="请选择行业"
                    @change="changese"
                    collapse-tags
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <template slot="label">
                    <span style="color: red">*</span>分支机构数
                  </template>
                  <el-input-number
                    :min="0"
                    v-model="formData.branch"
                    :disabled="true"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="employees">
                  <template slot="label">
                    <span style="color: red">*</span>职工人数
                  </template>
                  <el-input
                    v-model="formData.employees"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    clearable
                    :style="{ width: '100%' }"
                    @input="inputtest"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="overseas">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>留学归国人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.overseas"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="masterStudy">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>硕士及以上人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.masterStudy"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 60px; width: 100%"
                  prop="juniorcollege"
                >
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -61px;
                      "
                      ><span style="color: red">*</span>大专及以上人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.juniorcollege"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 190px; width: 100%"
                  prop="development"
                >
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -15px;
                      "
                      ><span style="color: red">*</span>研发/技术人数</span
                    ></template
                  >
                  <el-input
                    v-model="formData.development"
                    clearable
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :style="{ width: '100%' }"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" align="top">
              <el-col :span="6">
                <el-form-item prop="officespace">
                  <template slot="label"
                    ><span style="color: red">*</span>办公面积</template
                  >
                  <el-input
                    placeholder="请输入办公面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.officespace"
                    :disabled="true"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="officebuilding">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>购置办公用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输办公用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.officebuilding"
                    :disabled="true"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="research">
                  <template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>科研用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输入科研用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.research"
                    :disabled="true"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 60px; width: 100%"
                  prop="management"
                >
                  <template slot="label">
                    <span style="color: red">*</span>经营面积</template
                  >
                  <el-input
                    placeholder="请输入经营面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.management"
                    :disabled="true"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  style="margin-left: 190px; width: 100%"
                  prop="hireoffice"
                  ><template slot="label"
                    ><span
                      style="
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                        margin-left: -65px;
                      "
                      ><span style="color: red">*</span>租赁办公用房面积</span
                    ></template
                  >
                  <el-input
                    placeholder="请输入租赁办公用房面积"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    v-model="formData.hireoffice"
                    :disabled="true"
                  >
                    <template slot="append">m²</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- //第二版块 -->
        <div class="honor">
          <div class="towtitle">
            <i></i>
            <p></p>
            <b>荣誉资质</b>
            <span>(请准确填写您的信息，我们会为您匹配更准确的政策)</span>
          </div>

          <el-form
            ref="elForm2"
            :model="formhonor"
            :rules="rules"
            size="mini"
            label-width="100px"
            label-position="left"
          >
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">创新创业大赛获奖企业</p>
                <el-checkbox-group
                  v-model="formhonor.addjibie"
                  size="medium"
                  @change="changeonecheck"
                >
                  <el-checkbox :label="1" name="type"
                    >区级(县/镇)级</el-checkbox
                  >
                  <el-checkbox :label="2" name="type">市级</el-checkbox>
                  <el-checkbox :label="3" name="type">省级</el-checkbox>
                  <el-checkbox :label="4" name="type">国家级</el-checkbox>
                  <el-checkbox :label="5" name="type">国际级</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第二行多选框 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">承担或参与科技计划(专项）项目</p>
                <el-checkbox-group v-model="formhonor.addTwoChek" size="medium">
                  <el-checkbox :label="1" name="type2"
                    >区级(县/镇)级</el-checkbox
                  >
                  <el-checkbox :label="2" name="type2">市级</el-checkbox>
                  <el-checkbox :label="3" name="type2">省级</el-checkbox>
                  <el-checkbox :label="4" name="type2">国家级</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第三行多选框 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">承担或参与科技奖励获奖项目</p>
                <el-checkbox-group
                  v-model="formhonor.addthreeChek"
                  size="medium"
                >
                  <el-checkbox :label="1" name="type3"
                    >区级(县/镇)级</el-checkbox
                  >
                  <el-checkbox :label="2" name="type3">市级</el-checkbox>
                  <el-checkbox :label="3" name="type3">省级</el-checkbox>
                  <el-checkbox :label="4" name="type3">国家级</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第四行承担或参与科技奖励获奖项目 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">上市情况</p>
                <el-checkbox-group
                  v-model="formhonor.addfourChek"
                  size="medium"
                  @change="changeashagnshi"
                >
                  <el-checkbox :label="1" name="type4"
                    >暂时无上市计划</el-checkbox
                  >
                  <el-checkbox :label="2" name="type4">辅导备案</el-checkbox>
                  <el-checkbox :label="3" name="type4"
                    >完成上市辅导</el-checkbox
                  >
                  <el-checkbox :label="4" name="type4"
                    >上市后备企业</el-checkbox
                  >
                  <el-checkbox :label="5" name="type4">已上市</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第五行企业异动 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">企业异动</p>
                <el-checkbox-group
                  v-model="formhonor.addfiveChek"
                  size="medium"
                  @change="qyyid"
                >
                  <el-checkbox :label="1" name="type5">正常运营</el-checkbox>
                  <el-checkbox :label="2" name="type5">升级转型</el-checkbox>
                  <el-checkbox :label="3" name="type5">筹备上市</el-checkbox>
                  <el-checkbox :label="4" name="type5">准备搬迁</el-checkbox>
                  <el-checkbox :label="5" name="type5">准备结业</el-checkbox>
                  <el-checkbox :label="6" name="type5"
                    >开设分支机构</el-checkbox
                  >
                  <el-checkbox :label="7" name="type5">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第六行融资渠道 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">融资渠道</p>
                <el-checkbox-group v-model="formhonor.addsixChek" size="medium">
                  <el-checkbox :label="1" name="type5"
                    >银行等金融机构信贷</el-checkbox
                  >
                  <el-checkbox :label="2" name="type5"
                    >金融租赁融资</el-checkbox
                  >
                  <el-checkbox :label="3" name="type5">民间借贷</el-checkbox>
                  <el-checkbox :label="4" name="type5"
                    >股权出让融资</el-checkbox
                  >
                  <el-checkbox :label="5" name="type5">放行债券</el-checkbox>
                  <el-checkbox :label="6" name="type5"
                    >无外部融资渠道</el-checkbox
                  >
                  <el-checkbox :label="7" name="type5"
                    >非金融机构及其他企业借贷</el-checkbox
                  >
                  <el-checkbox :label="8" name="type5">定向增发</el-checkbox>
                  <el-checkbox :label="9" name="type5">引入风险投资</el-checkbox>
                  <el-checkbox :label="10" name="type5"
                    >商业信用融资(应付账款融资、商业票据融资等)</el-checkbox
                  >
                  <el-checkbox :label="11" name="type5">发行股票</el-checkbox>
                  <el-checkbox :label="12" name="type5"
                    >其他外部融资渠道</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <!-- 第七行 -->
            <el-row>
              <el-form-item class="titleleft">
                <p class="sontitle">企业资质</p>
                <el-form-item label="首次纳统年度">
                  <el-select
                    v-model="formhonor.addsevenChek"
                    placeholder="请选择首次纳统年度"
                    :popper-append-to-body="false"
                  >
                    <el-option label="未纳统" :value="0"></el-option>
                    <el-option label="2020年" :value="2020"></el-option>
                    <el-option label="2019年" :value="2019"></el-option>
                    <el-option label="2018年" :value="2018"></el-option>
                    <el-option label="2017年" :value="2017"></el-option>
                    <el-option label="2016年" :value="2016"></el-option>
                    <el-option label="2015年" :value="2015"></el-option>
                    <el-option label="2014年" :value="2014"></el-option>
                    <el-option label="2013年" :value="2013"></el-option>
                    <el-option label="2012年" :value="2012"></el-option>
                    <el-option label="2011年" :value="2011"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-checkbox-group v-model="formhonor.addeightChek">
                    <el-checkbox :label="1">国家高新技术企业</el-checkbox>
                    <el-checkbox :label="2">上市企业</el-checkbox>
                    <el-checkbox :label="3">挂牌未上市</el-checkbox>
                    <el-checkbox :label="4">市级总部企业</el-checkbox>
                    <el-checkbox :label="5">区级总部企业</el-checkbox>
                    <el-checkbox :label="6">科技型中小微业</el-checkbox>
                    <el-checkbox :label="7"
                      >纳入统计局备案规模以上企业</el-checkbox
                    >
                    <el-checkbox :label="8">软件企业</el-checkbox>
                    <el-checkbox :label="9">两化融合贯标</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form-item>
            </el-row>
          </el-form>
        </div>

        <!-- 第三版块 -->
        <div class="honor">
          <h3 class="towtitle">
            <i></i>
            <p></p>
            <b>企业单位财务情况资质(万元）</b>
            <span>(请准确填写您的信息，我们会为您匹配更准确的政策)</span>
          </h3>
          <p class="tabletitle">*请依次输入2020-2018年的财务状况</p>
          <!-- 表格控件 -->
          <table class="tabzz" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <td></td>
              <td>销售收入</td>
              <td>净利润</td>
              <td>净资产</td>
              <td>纳税额</td>
              <td>研发费用</td>
              <td>设备投入</td>
              <td>信息化软件投入</td>
              <td>品牌推广费用</td>
            </tr>
            <tr>
              <td style="width: 70px">2020年</td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputxs"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入销售收入"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputlr"
                  placeholder="请输入净利润"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-').replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  @change="changeinput('oneinputlr')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputzc"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-').replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  placeholder="请输入净资产"
                  @change="changeinputzcOne('oneinputzc')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputns"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入纳税额"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputyf"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入研发费用"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputsbei"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入设备投入"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputrj"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入信息化软件费"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.oneinputpp"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入品牌推广费"
                  maxlength="11"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 70px">2019年</td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputxs"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入销售收入"
                  maxlength="11"
                  @blur="blurxs"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputlr"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-').replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  placeholder="请输入净利润"
                  @blur="blurlr"
                  @change="changeBlurlr('twoinputlr')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputzc"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-') .replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  placeholder="请输入净资产"
                  @blur="blurzc"
                  @change="changeBlurzc('twoinputzc')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputns"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入纳税额"
                  maxlength="11"
                  @blur="blurns"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputyf"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入研发费用"
                  @blur="bluryf"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputsbei"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入设备投入"
                  @blur="blursbei"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputrj"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入信息化软件费"
                  @blur="blursrj"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model.trim="forminput.twoinputpp"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入品牌推广费"
                  @blur="blurspp"
                  maxlength="11"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 70px">2018年</td>
              <td>
                <el-input
                  v-model="forminput.threeinputxs"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入销售收入"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputlr"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-') .replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  placeholder="请输入净利润"
                  @change="changethreeinputlr('threeinputlr')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputzc"
                  oninput="value=value.replace(/[^\-?\d.]/g,'').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace('-','$#$').replace(/\-/g,'').replace('$#$','-') .replace( /([0-9]+\.[0-9]{2})[0-9]*/,'$1').replace(/[^\-?\d.]/g,'')"
                  placeholder="请输入净资产"
                  @change="changethreeinputzc('threeinputzc')"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputns"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入纳税额"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputyf"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入研发费用"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputsbei"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入设备投入"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputrj"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入信息化软件费"
                  maxlength="11"
                ></el-input>
              </td>
              <td>
                <el-input
                  v-model="forminput.threeinputpp"
                  onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                  placeholder="请输入品牌推广费"
                  maxlength="11"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>近两年增长率</td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputxs"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputlr"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputzc"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputns"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputyf"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputsbei"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputrj"
                ></el-input>
              </td>
              <td>
                <el-input
                  :disabled="true"
                  v-model="forminput.fourinputpp"
                ></el-input>
              </td>
            </tr>
          </table>
        </div>
        <!-- 第四版块 -->
        <div class="honor">
          <h3 class="towtitle">
            <i></i>
            <p></p>
            <b>单位知识产权情况(数量)</b
            ><span>(请准确填写您的信息，我们会为您匹配更准确的政策)</span>
          </h3>
          <el-button
            type="primary"
            class="incountry"
            :autofocus="showCountry"
            plain
            :class="[showCountry ? 'stylubtn' : 'styleblank']"
            @click="showCountry = true"
            >授权量（国内)</el-button
          >
          <el-button
            type="primary"
            class="outcountry"
            plain
            :class="[showCountry == false ? 'stylubtn' : 'styleblank']"
            @click="showCountry = false"
            >授权量（国外)</el-button
          >
          <!-- 国内资质 -->
          <div class="formcontry" v-show="showCountry === true">
            <el-form
              :model="formcontry"
              :rules="rules"
              ref="ruleForm1"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="faming">
                    <template slot="label"
                      ><span style="color: red">*</span>发明专利
                    </template>
                    <el-input
                      v-model="formcontry.faming"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="shiyongxin">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>实用新型专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.shiyongxin"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="waiguan">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>外观设计专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.waiguan"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item prop="jichen">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>集成电路布局专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.jichen"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="ruanzhu">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>计算机软件著作权</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.ruanzhu"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!--// 国内资质 -->

          <!-- 国外资质 -->
          <div class="formcontry" v-show="showCountry === false">
            <el-form
              :model="formcontry"
              :rules="rules"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="onfaming">
                    <template slot="label"
                      ><span style="color: red">*</span>发明专利</template
                    >
                    <el-input
                      v-model="formcontry.onfaming"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="onshiyongxin">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>实用新型专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.onshiyongxin"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="onwaiguan">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>外观设计专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.onwaiguan"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item prop="onjichen">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>集成电路布局专利</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.onjichen"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="onruanzhu">
                    <template slot="label"
                      ><span
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          word-break: keep-all;
                          margin-left: -61px;
                        "
                        ><span style="color: red">*</span>计算机软件著作权</span
                      ></template
                    >
                    <el-input
                      v-model="formcontry.onruanzhu"
                      onkeyup="value=value.replace(/[^\d]/g,'')"
                      maxlength="10"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!--// 国外资质 -->
          <div class="btns" style="margin-top: 10px">
            <el-button
              type="primary"
              @click="submitForm"
              v-loading.fullscreen.lock="fullscreenLoading"
              >提交</el-button
            >
          </div>
        </div>
      </div>
      <!-- //第一块面板 -->

      <!--第二块面板 -->
    </el-card>
    <div
      class="formmaintwo"
      v-if="active === 1"
      style="position: relative; margin-top: 10px"
    >
      <el-card>
        <div class="returnUp" @click="active--">&lt;返回上一层</div>

        <!-- 上传Excel文件按钮（第二级） -->
        <div class="excelBtn" @click="excelClickTwo('2')">上传文件</div>
        <div class="modelBtn" @click="modelFileClickTwo">模板下载</div>
        <mathching2
          :templatelist="templatelist"
          :active="active"
          @returnUp="returnUp(arguments)"
        ></mathching2>
      </el-card>
    </div>

    <!-- 第三块面板 -->
    <div
      class="formmainthree"
      v-if="active === 2"
      style="position: relative; margin-top: 10px"
    >
      <el-card>
        <div class="returnUp" @click="active--">&lt;返回上一层</div>

        <!-- 上传Excel文件按钮（第三级） -->
        <div class="excelBtn" @click="excelClickTherr('3')">上传文件</div>
        <div class="modelBtn" @click="modelFileClickTherr">模板下载</div>
        <mathching2 :templatelist="templatelist2" :active="active"></mathching2>
      </el-card>
    </div>

    <!-- <el-button type="primary" @click="next">下一步</el-button> -->

    <!-- 上传excel文件 -->
    <div>
      <el-dialog
        title="上传填写好的文件"
        :visible.sync="excelDialogIs"
        width="400px"
      >
        <el-upload
          ref="myUpload"
          class="upload-demo"
          :headers="{ Authorization: 'Bearer ' + token }"
          :auto-upload="true"
          :action="$http + uploadApi"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="uploadSuccess"
          :file-list="fileList"
        >
          <div class="addFH"></div>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//   定义数字验证
var numberIs = (rule, value, cb) => {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(value) || regNeg.test(value)) {
    return cb();
  }
  cb(new Error("请输入合法的数字"));
};

import {
  getcategory,
  getsubject,
  addMatch,
  getBusiness,
  getMatchDefault,
  importExcel,
  importExcelTwo,
} from "@/utils/match.js";

import mathching2 from "@/components/matching2/mathching2";

// import {filterNumber} from '@/utils/filterNum.js'
export default {
  data() {
    return {
      token: null,
      fileList: [],
      imgFile: "",

      uploadNum: "1",
      uploadApi: "/match/importExcel",

      active: 0,
      templatelist: [],
      templatelist2: [],
      mk: {},
      // 处理多选框对象
      listModel: {},
      // 处理过后的分支
      formindustry: "",
      formData: {
        adddate: null,
        // addaddress: undefined,
        addaddress: "深圳市龙岗区",
        // 资本
        // capital: undefined,
        capital: 50,
        // 主题
        // addmain: undefined,
        addmain: undefined,

        // 行业
        industry: [],

        // 分支
        branch: 0,

        // 职工人数
        employees: 0,

        // Overseas Study留学人数
        overseas: 0,

        // 硕士及以上
        masterStudy: 0,
        // 大专人数
        juniorcollege: 0,

        // 研发人员
        development: 0,

        //办公面积
        officespace: 0,

        // 办公用房面积
        officebuilding: 0,

        // 科研用房面积
        research: 0,

        // 经营面积
        management: 0,

        // 租聘办公面积
        hireoffice: 0,
      },
      formhonor: {
        addjibie: [],
        addTwoChek: [],
        addthreeChek: [],
        addfourChek: [],
        addfiveChek: [],
        addsixChek: [],
        addsevenChek: 0,
        addeightChek: [],
      },
      formcontry: {
        faming: 0,
        shiyongxin: 0,
        waiguan: 0,
        jichen: 0,
        ruanzhu: 0,
        onfaming: 0,
        onshiyongxin: 0,
        onwaiguan: 0,
        onjichen: 0,
        onruanzhu: 0,
      },
      valuelist: [],
      // 企业资质input数据
      forminput: {
        oneinputxs: 0,
        oneinputlr: 0,
        oneinputzc: 0,
        oneinputns: 0,
        oneinputyf: 0,
        oneinputsbei: 0,
        oneinputrj: 0,
        oneinputpp: 0,
        // two
        twoinputxs: 0,
        twoinputlr: 0,
        twoinputzc: 0,
        twoinputns: 0,
        twoinputyf: 0,
        twoinputsbei: 0,
        twoinputrj: 0,
        twoinputpp: 0,
        // /tow
        // three
        threeinputxs: 0,
        threeinputlr: 0,
        threeinputzc: 0,
        threeinputns: 0,
        threeinputyf: 0,
        threeinputsbei: 0,
        threeinputrj: 0,
        threeinputpp: 0,
        // four增长率
        fourinputxs: 0,
        fourinputlr: 0,
        fourinputzc: 0,
        fourinputns: 0,
        fourinputyf: 0,
        fourinputsbei: 0,
        fourinputrj: 0,
        fourinputpp: 0,
      },

      // 上传excel
      excelDialogIs: false,
      topXrIs: true,

      // 创新创业大赛获得的企业
      type: [],
      showCountry: true,
      rules: {
        onjichen: [
          {
            required: true,
            message: "请输国外集成电路",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        onwaiguan: [
          {
            required: true,
            message: "请输入国外外观设计专利",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        onshiyongxin: [
          {
            required: true,
            message: "请输入国外实用新型专利",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        onruanzhu: [
          {
            required: true,
            message: "请输入国外计算机软件著作权",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        onfaming: [
          { required: true, message: "请输入国外发明专利", trigger: "blur" },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        // 国外表单校验
        jichen: [
          {
            required: true,
            message: "请输入集成电路",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        waiguan: [
          {
            required: true,
            message: "请输入外观设计专利",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        shiyongxin: [
          {
            required: true,
            message: "请输入实用新型专利",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        ruanzhu: [
          {
            required: true,
            message: "请输入计算机软件著作权",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        faming: [
          { required: true, message: "请输入发明专利", trigger: "blur" },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        // ----------------------------------------------------------
        adddate: [{ required: true, message: "请选择日期", trigger: "change" }],
        addeightChek: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        addsixChek: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addfourChek: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addfiveChek: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addthreeChek: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addTwoChek: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addjibie: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个",
            trigger: "change",
          },
        ],
        addaddress: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur",
          },
        ],
        capital: [
          {
            required: true,
            message: "请输入资本",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        addmain: [
          {
            required: true,
            message: "请选择主体",
            trigger: "change",
          },
        ],
        industry: [
          {
            required: true,
            type: "array",
            message: "请选择分支",
            trigger: "change",
          },
        ],
        branch: [
          {
            required: true,
            message: "请输入分支机构",
            trigger: "blur",
          },
        ],
        employees: [
          {
            required: true,
            message: "请输入职工数",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        overseas: [
          {
            required: true,
            message: "请输入留学人数",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        masterStudy: [
          {
            required: true,
            message: "请输入硕士及以上的人数",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        juniorcollege: [
          {
            required: true,
            message: "请输入大专人数",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        development: [
          {
            required: true,
            message: "请输入研发技术人员",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        officespace: [
          {
            required: true,
            message: "请输入办公面积",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        officebuilding: [
          {
            required: true,
            message: "请输入办公室用房",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        research: [
          {
            required: true,
            message: "请输入科研用房面积",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        management: [
          {
            required: true,
            message: "请输入经营面积",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
        hireoffice: [
          {
            required: true,
            message: "请输入租聘办公面积",
            trigger: "blur",
          },
          {
            validator: numberIs,
            message: "请输入正确的数字",
            trigger: "blur",
          },
        ],
      },
      field108Options: [],
      field108Props: {
        multiple: true,
        expandTrigger: "hover",
        value: "categoryId",
        label: "categoryName",
        children: "children",
        checkStrictly: true,
        emitPath: false,
      },
      categoryList: [],
      subjectList: [],
      companylist: {},
      huitianlist: {},
      // 加载
      fullscreenLoading: false,
      hylength: null,
      defaultadres: "",
      addtime: null,
      inmationid: "",
      propertyId: "",
      propertyId2: "",
      wanyuandanwei: "",
      financeId: "",
      financeId2: "",
      financeId3: "",
      showDatadisa: false,
    };
  },
  created() {
    this.token = sessionStorage.getItem("token");
    // document.querySelector(".maodian").scrollIntoView();
    this.getAllInfo();
    // document.querySelector(".maodian").scrollIntoView();
    console.log(this.formData.industry, "页面有没有值类型");
    console.log(this.formindustry, "值类型");
  },
  mounted() {
    console.log("x1");
    this.$emit("srcoll");
  },
  methods: {
    inputtest() {
      console.log(this.formData.employees);
    },
    changeashagnshi() {
      console.log(this.formhonor.addfourChek);
    },
    qyyid() {
      console.log(this.formhonor.addfiveChek);
    },
    //  匹配默认信息
    getAllInfo() {
      // this.$emit("srcoll");

      // 匹配工商默认信息
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      // 加载公司的名字
      getMatchDefault(userinfo.companyName).then((res) => {
        if (res.data.Status === "201") {
          return;
        }
        console.log(res, "填充数据");
        let str = res.data.registCapi;
        let str2 = res.data.registCapi;
        let index = str.lastIndexOf("万");
        str = str.substring(0, index);
        this.formData.capital = str;

        var name = str2.substring(str2.lastIndexOf("万"));
        this.wanyuandanwei = name;

        // 默认填充时间
        let startDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.startDate);
        this.addtime = startDate[0];
        this.formData.adddate = this.addtime;
        // 填充默认地址
        this.defaultadres = res.data.address;
        this.formData.addaddress = this.defaultadres;
      });
      // 查询默认信息  回写数据------------------------------------------------------------------
      getBusiness().then((res) => {
        console.log(res, "默认信息回填");
        if (!res.data) {
          return (this.showDatadisa = true);
        }
        this.huitianlist = res.data;
        const list = this.huitianlist;

        this.xrFunc(list);
      });
      // 查询主体和行业
      getcategory().then((res) => {
        //  this.categoryList=res.rows
        const data = res.rows;
        this.categoryList = this.getTreeData(data);
      });
      getsubject().then((res) => {
        this.subjectList = res.rows;
        console.log(res);

        this.$emit("srcoll");
        // console.log(this.subjectList);
      });
      // 查询主体和行业
      // const adrs = localStorage.getItem("ADDRESS");
      // const creatdata = localStorage.getItem("DATETIME");
      // this.formData.addaddress=adrs

      // this.formData.addaddress = "深圳市龙岗区";
      // if(creatdata!=""){
      // let newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(creatdata)
      // this.formData.adddate = newDate[0];
      // }
    },

    // 封装的回写函数
    xrFunc(list) {
      if (this.topXrIs) {
        // 填充行业主题 subjectId
        console.log(list.subjectId, "值类型");
        this.formData.addmain = Number(list.subjectId);

        //  处理行业分支
        let selectarr = list.categoryId.split(",");
        console.log(selectarr, "处理回填数组");
        let arr = [];
        const calist = this.categoryList;
        selectarr.forEach((item, index) => {
          arr.push(Number(item));
        });
        // console.log(list.categoryId, "处理完的数组");
        this.formData.industry = arr;
        this.formindustry = list.categoryId;

        this.formData.branch = list.branchesNumber; // 回填分支机构数
        this.formData.management = list.businessArea; // 回填经营面积
        // // list.categoryId回填行业的下拉框暂时放哈
        this.formData.juniorcollege = list.collegeNumber; // 回填大专人数

        // 硕士及以上的人数 masterNumber
        this.formData.masterStudy = list.masterNumber;

        // 办公面积 officeArea
        this.formData.officespace = list.officeArea;

        // purchasedArea 购置办公用房面积
        this.formData.officebuilding = list.purchasedArea;

        // 地址 registerAddress
        if (list.registerAddress != "") {
          this.formData.addaddress = list.registerAddress;
        } else {
          this.formData.addaddress = this.defaultadres;
        }

        // 注册资本 registerCapi
        this.formData.capital = list.registerCapi;

        //注册时间 this.addtime
        if (list.registerTime != "") {
          this.formData.adddate = list.registerTime;
        } else {
          this.formData.adddate = this.addtime;
        }

        // 租赁办公面积 rentalArea
        this.formData.hireoffice = list.rentalArea;

        // 科研用房面积
        this.formData.research = list.researchArea;

        // 研发人员数量 researchNumber
        this.formData.development = list.researchNumber;

        // 留学归国人数
        this.formData.overseas = list.returneesNumber;

        // 职工人数
        this.formData.employees = list.workersNumber;

        // informationId
        this.inmationid = list.informationId;
      }

      // 处理企业异动数组
      if (list.honorFive.length != 0) {
        let ydarr = list.honorFive.split(",");
        ydarr = ydarr.map(Number);
        this.formhonor.addfiveChek = ydarr; // 企业异动框
      } else {
        this.formhonor.addfiveChek = [];
      }

      // honorEight 企业资质
      if (list.honorEight != 0) {
        let qyzz = list.honorEight.split(",");
        qyzz = qyzz.map(Number);
        this.formhonor.addeightChek = qyzz;
      } else {
        this.formhonor.addeightChek = [];
      }

      // ssqk 上市情况 formhonor.addfourChek honorFour
      if (list.honorFour.length != 0) {
        let ssqk = list.honorFour.split(",");
        ssqk = ssqk.map(Number);
        this.formhonor.addfourChek = ssqk;
      } else {
        this.formhonor.addfourChek = [];
      }

      // 创新创业大赛获奖 honorOne formhonor.addjibie
      if (list.honorOne.length != 0) {
        let csds = list.honorOne.split(",");
        csds = csds.map(Number);
        this.formhonor.addjibie = csds;
      } else {
        this.formhonor.addjibie = [];
      }

      //honorSeven  纳通年度
      this.formhonor.addsevenChek = list.honorSeven;

      // honorSix 融资渠道 formhonor.addsixChek
      if (list.honorSix.length != 0) {
        let rzqd = list.honorSix.split(",");
        rzqd = rzqd.map(Number);
        this.formhonor.addsixChek = rzqd;
      } else {
        this.formhonor.addsixChek = [];
      }

      // 承担或科技获奖项目formhonor.addthreeChek
      if (list.honorThree.length != 0) {
        let cdkj = list.honorThree.split(",");
        cdkj = cdkj.map(Number);
        this.formhonor.addthreeChek = cdkj;
      } else {
        this.formhonor.addthreeChek = [];
      }

      // 承担专项 honorTwo  formhonor.addTwoChek
      if (list.honorTwo.length != 0) {
        let cdzx = list.honorTwo.split(",");
        cdzx = cdzx.map(Number);
        this.formhonor.addTwoChek = cdzx;
      } else {
        this.formhonor.addTwoChek = [];
      }

      // nianfen 填充总部table表格
      list.financeList.forEach((item) => {
        if (item.year == "2020") {
          console.log(item, "年份");
          (this.forminput.oneinputsbei = item.equipmentInvestment), // 设备投入
            (this.forminput.oneinputzc = item.netAssets); // 净资产
          this.forminput.oneinputlr = item.netProfit; // 净利润
          this.forminput.oneinputpp = item.promotionExpenses; // 品牌推广费
          this.forminput.oneinputyf = item.researchExpenses; // 研发费
          this.forminput.oneinputxs = item.salesRevenue; // 销售收入
          this.forminput.oneinputrj = item.softwareInvestment; // 信息化软件
          this.forminput.oneinputns = item.taxAmount; // 纳税额
          this.financeId3 = item.financeId;
          // console.log(this.financeId3,"2020年id",item.year);
        }
        if (item.year == "2019") {
          (this.forminput.twoinputsbei = item.equipmentInvestment), // 设备投入
            (this.forminput.twoinputzc = item.netAssets); // 净资产
          this.forminput.twoinputlr = item.netProfit; // 净利润
          this.forminput.twoinputpp = item.promotionExpenses; // 品牌推广费
          this.forminput.twoinputyf = item.researchExpenses; // 研发费
          this.forminput.twoinputxs = item.salesRevenue; // 销售收入
          this.forminput.twoinputrj = item.softwareInvestment; // 信息化软件
          this.forminput.twoinputns = item.taxAmount; // 纳税额
          this.financeId2 = item.financeId;
          // console.log(this.financeId2,"2019年id",item.year);
        }
        if (item.year == "2018") {
          console.log(item, "年份");
          (this.forminput.threeinputsbei = item.equipmentInvestment), // 设备投入
            (this.forminput.threeinputzc = item.netAssets); // 净资产
          this.forminput.threeinputlr = item.netProfit; // 净利润
          this.forminput.threeinputpp = item.promotionExpenses; // 品牌推广费
          this.forminput.threeinputyf = item.researchExpenses; // 研发费
          this.forminput.threeinputxs = item.salesRevenue; // 销售收入
          this.forminput.threeinputrj = item.softwareInvestment; // 信息化软件
          this.forminput.threeinputns = item.taxAmount; // 纳税额
          this.financeId = item.financeId;
          // console.log(this.financeId,"2018年id",item.year);
        }
        // 回填后调用方法自动算出增长率
        this.blurxs();
        this.blurzc();
        this.blurlr();
        this.blurns();
        this.bluryf();
        this.blursbei();
        this.blursrj();
        this.blurspp();
      });

      // 填充年份表格
      list.propertyList.forEach((item) => {
        if (item.type == 1) {
          console.log(item, "国内");
          this.formcontry.waiguan = item.appearance; // 外观
          this.formcontry.jichen = item.circuitDiagram; //集成电路
          this.formcontry.faming = item.inventionPatent; // 发明专利
          this.formcontry.ruanzhu = item.softwareCopyright; // 计算机软著
          (this.propertyId = item.propertyId),
            (this.formcontry.shiyongxin = item.utilityModel); // 实用新型专利
        }
        if (item.type == 2) {
          console.log(item, "国外");
          this.formcontry.onwaiguan = item.appearance; // 外观
          this.formcontry.onjichen = item.circuitDiagram; //集成电路
          this.formcontry.onfaming = item.inventionPatent; // 发明专利
          this.formcontry.onruanzhu = item.softwareCopyright; // 计算机软著
          (this.propertyId2 = item.propertyId),
            (this.formcontry.onshiyongxin = item.utilityModel); // 实用新型专利
        }
      });
    },
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      // 递归剔除最后一层空children
      return data;
    },

    // 提交数据-------------------------------------------------------------------
    async submitForm() {
      //判断行业的
      // if(this.hylength>5){
      //   return this.$message.error("最大选择5个行业")
      // }
      // 一起验证
      try {
        await Promise.all([
          this.$refs["elForm"].validate(),
          this.$refs["elForm2"].validate(),
          this.$refs["ruleForm1"].validate(),
          this.$refs["ruleForm2"].validate(),
        ]);
      } catch (error) {
        return this.$message.error("请查看填写是否正确或有未填");
      }

      // 由于表格输入模块没有加表单验证，这里手动验证
      for (let item in this.forminput) {
        let itemNumber = Number(this.forminput[item]);
        // console.log(isNaN(itemNumber));
        if (isNaN(itemNumber)) {
          this.$message.error("企业单位财务情况资质填写有误！请检查！");
          return;
        }
      }

      // // 处理年份数组对象
      this.fullscreenLoading = true;
      const finalist = [
        {
          //  20年
          equipmentInvestment: this.forminput.oneinputsbei, // 设备投入
          netAssets: this.forminput.oneinputlr, // 净资产
          netProfit: this.forminput.oneinputzc, // 净利润
          promotionExpenses: this.forminput.oneinputpp, // 品牌推广费
          researchExpenses: this.forminput.oneinputyf, // 研发费
          salesRevenue: this.forminput.oneinputxs, // 销售收入
          softwareInvestment: this.forminput.oneinputrj, // 信息化软件
          taxAmount: this.forminput.oneinputns, // 纳税额
          financeId: this.financeId3,
          year: 2020,
        },
        {
          // 19年
          equipmentInvestment: this.forminput.twoinputsbei, // 设备投入
          netAssets: this.forminput.twoinputzc, // 净资产
          netProfit: this.forminput.twoinputlr, // 净利润
          promotionExpenses: this.forminput.twoinputpp, // 品牌推广费
          researchExpenses: this.forminput.twoinputyf, // 研发费
          salesRevenue: this.forminput.twoinputxs, // 销售收入
          softwareInvestment: this.forminput.twoinputrj, // 信息化软件
          taxAmount: this.forminput.twoinputns, // 纳税额
          financeId: this.financeId2,
          year: 2019,
        },
        {
          //  18年
          equipmentInvestment: this.forminput.threeinputsbei, // 设备投入
          netAssets: this.forminput.threeinputzc, // 净资产
          netProfit: this.forminput.threeinputlr, // 净利润
          promotionExpenses: this.forminput.threeinputpp, // 品牌推广费
          researchExpenses: this.forminput.threeinputyf, // 研发费
          salesRevenue: this.forminput.threeinputxs, // 销售收入
          softwareInvestment: this.forminput.threeinputrj, // 信息化软件
          taxAmount: this.forminput.threeinputns, // 纳税额
          financeId: this.financeId,
          year: 2018,
        },
      ];

      // 处理国内外单位知识产权情况(数量)
      const propeList = [
        // 国内
        {
          appearance: this.formcontry.waiguan, // 外观
          circuitDiagram: this.formcontry.jichen, //集成电路
          inventionPatent: this.formcontry.faming, // 发明专利
          softwareCopyright: this.formcontry.ruanzhu, // 计算机软著
          type: 1,
          propertyId: this.propertyId,
          utilityModel: this.formcontry.shiyongxin, // 实用新型专利
        },
        {
          //  国外
          appearance: this.formcontry.onwaiguan, // 外观
          circuitDiagram: this.formcontry.onjichen, //集成电路
          inventionPatent: this.formcontry.onfaming, // 发明专利
          softwareCopyright: this.formcontry.onruanzhu, // 计算机软著
          propertyId: this.propertyId2,
          type: 2,
          utilityModel: this.formcontry.onshiyongxin, // 实用新型专利
        },
      ];

      const local = JSON.parse(localStorage.getItem("userInfo"));
      console.log(local);
      const keyno = localStorage.getItem("KEYNO");
      // console.log(keyno);
      const addmatchform = {
        informationId: this.inmationid,
        branchesNumber: this.formData.branch, // 分支
        businessArea: this.formData.management, // 经营面积
        categoryId: this.formindustry, // 分支
        collegeNumber: this.formData.juniorcollege, // 大专及以上人数
        financeList: finalist, // tab表格数据
        honorEight: this.formhonor.addeightChek.toString(), // 企业资质多选框
        honorFive: this.formhonor.addfiveChek.toString(), // 企业异动
        honorFour: this.formhonor.addfourChek.toString(), // 上市情况
        honorOne: this.formhonor.addjibie.toString(), // 获奖级别
        honorSeven: this.formhonor.addsevenChek, // 纳统年度
        honorSix: this.formhonor.addsixChek.toString(), // 融资渠道
        honorThree: this.formhonor.addthreeChek.toString(), // 承担参与科技奖励项目
        honorTwo: this.formhonor.addTwoChek.toString(), // 承担参与科技计划项目
        keyNo: keyno,
        masterNumber: this.formData.masterStudy, // 硕士人数
        officeArea: this.formData.officespace, // 办公面积
        propertyList: propeList, // 国内外
        purchasedArea: this.formData.officebuilding, //购置办公
        registerAddress: this.formData.addaddress, // 注册地址
        registerCapi: this.formData.capital, //注册资金
        registerTime: this.formData.adddate, // 注册时间
        rentalArea: this.formData.hireoffice, //租聘办公面积大小
        researchArea: this.formData.research, //科研用房大小
        researchNumber: this.formData.development, //研发技术人数
        returneesNumber: this.formData.overseas, // 留学归国人数
        subjectId: this.formData.addmain, //主体ID
        userId: local.uid,
        workersNumber: this.formData.employees,
      };
      // 请求接口
      addMatch(addmatchform).then((res) => {
        console.log(res);
        this.fullscreenLoading = false;
        if (res.code != 200) return this.$message.error(res.msg);
        if (res.data.schemeSize === 0)
          return this.$message.error("暂无匹配项 请更改条件后重新进行匹配");
        //  console.log(res);
        if (res.code === 200) {
          // 获取到下一级的模板数据渲染到dom中
          this.active = this.active + 1;
          this.templatelist = res.data.templateList;
        }
      });
    },
    changebox() {
      this.mk = JSON.parse(JSON.stringify(this.mk));
      console.log(this.mk);
    },
    changedanxuan(val) {
      console.log(this.templatelist.fillValue);
    },
    addForm() {
      let i = 0;
      for (let item of this.mydata) {
        item.fillValue = [];
        item.options = item.options.split("|");
        item.options.forEach((ti, ind) => {
          item.fillValue.push(this.mk["l" + i + ind]);
        });
        item.fillValue = item.fillValue.toString();
        ++i;
        // console.log(this.mk)
      }
      // 打印
      console.log(this.mydata, "ssss");
      //  this.templatelist=this.mydata
      //  console.log(this.templatelist);
      console.log(this.mydata, "res");
    },
    resetForm() {
      // 重置表单方法
      this.$refs["elForm"].resetFields();
      this.$refs["elForm2"].resetFields();
      this.$refs["ruleForm1"].resetFields();
      this.$refs["ruleForm1"].resetFields();
    },
    getField108Options() {
      // TODO 发起请求获取数据
      this.field108Options;
    },
    // 处理分支数组
    changese() {
      console.log(this.formData.industry, "已经选择的ID");
      let arr = this.formData.industry;
      console.log(arr, "arr1");
      arr.map((item) => {
        if (item.length <= 1) {
          item.push(0);
        }
        return item;
      });
      // console.log(cateId.tostring());
      while (arr.some((t) => Array.isArray(t))) {
        arr = [].concat.apply([], arr);
      }
      console.log(arr, "arr");
      let arr1 = [...new Set(arr)];
      // 不去重 也不能改变数组结构
      this.formindustry = arr.join(",");
      console.log(this.formindustry, "提交的数组传递");
    },
    blurxs() {
      if (this.forminput.twoinputxs === "" || this.forminput.oneinputxs === "")
        return;
      // console.log(this.forminput.twoinputxs === "");
      if (this.forminput.twoinputxs == 0) return;
      const zzl =
        (this.forminput.oneinputxs / this.forminput.twoinputxs - 1) * 100;
      this.forminput.fourinputxs = Math.floor(zzl * 100) / 100;
    },
    blurlr() {
      if (this.forminput.twoinputlr == 0) return;
      if (
        this.forminput.oneinputlr === "" ||
        this.forminput.twoinputlr === ""
      ) {
        return;
      }
      const zzl =
        (this.forminput.oneinputlr / this.forminput.twoinputlr - 1) * 100;
      this.forminput.fourinputlr = Math.floor(zzl * 100) / 100;
    },
    blurzc() {
      if (
        this.forminput.oneinputzc === "" ||
        this.forminput.twoinputzc === ""
      ) {
        return;
      }
      if (this.forminput.twoinputzc == 0) return;
      const zzl =
        (this.forminput.oneinputzc / this.forminput.twoinputzc - 1) * 100;
      this.forminput.fourinputzc = Math.floor(zzl * 100) / 100;
    },
    blurns() {
      if (this.forminput.oneinputns === "" || this.forminput.twoinputns === "")
        return;
      if (this.forminput.twoinputns == 0) return;
      const zzl =
        (this.forminput.oneinputns / this.forminput.twoinputns - 1) * 100;
      this.forminput.fourinputns = Math.floor(zzl * 100) / 100;
    },
    bluryf() {
      if (this.forminput.oneinputyf === "" || this.forminput.twoinputyf === "")
        return;
      if (this.forminput.twoinputyf == 0) return;
      const zzl =
        (this.forminput.oneinputyf / this.forminput.twoinputyf - 1) * 100;
      this.forminput.fourinputyf = Math.floor(zzl * 100) / 100;
    },
    blursbei() {
      if (
        this.forminput.oneinputsbei === "" ||
        this.forminput.twoinputsbei === ""
      )
        return;
      if (this.forminput.twoinputsbei == 0) return;
      const zzl =
        (this.forminput.oneinputsbei / this.forminput.twoinputsbei - 1) * 100;
      this.forminput.fourinputsbei = Math.floor(zzl * 100) / 100;
    },
    blursrj() {
      if (this.forminput.twoinputrj === "" || this.forminput.twoinputrj === "")
        return;
      if (this.forminput.twoinputrj == 0) return;
      const zzl =
        (this.forminput.oneinputrj / this.forminput.twoinputrj - 1) * 100;
      this.forminput.fourinputrj = Math.floor(zzl * 100) / 100;
    },
    blurspp() {
      if (this.forminput.twoinputpp === "" || this.forminput.twoinputpp === "")
        return;
      if (this.forminput.twoinputpp == 0) return;
      const zzl =
        (this.forminput.oneinputpp / this.forminput.twoinputpp - 1) * 100;
      this.forminput.fourinputpp = Math.floor(zzl * 100) / 100;
    },
    // renum(a,b,c){
    //   let num=(a/b-1)*100
    //   c=Math.floor(num * 100)/100
    //   return c
    // }
    returnUp(msg) {
      console.log(msg);
      this.active = msg[0];
      this.templatelist2 = msg[1];
    },
    changeonecheck() {
      console.log(this.formhonor.addjibie);
    },
    // 过滤一些不规则数字函数
    filterNumber(value) {
      // 判断不必要的字符
      if (
        !this.forminput[value] ||
        this.forminput[value] === "-" ||
        this.forminput[value] === "-0" ||
        this.forminput[value] === "-."
      ) {
        this.forminput[value] = 0;
      }
      // 判断是否为数字
      this.forminput[value] = Number(this.forminput[value]);
      if (isNaN(this.forminput[value])) {
        this.forminput[value] = 0;
      }
    },
    changeinput(value) {
      // 一些错误输入的判断
      this.filterNumber(value);
    },
    changeinputzcOne(value) {
      // 一些错误输入的判断
      this.filterNumber(value);
    },
    changeBlurlr(value) {
      this.filterNumber(value);
    },
    changeBlurzc(value) {
      // 一些错误输入的判断
      this.filterNumber(value);
    },
    changethreeinputlr(value) {
      // 一些错误输入的判断
      this.filterNumber(value);
    },
    changethreeinputzc(value) {
      // 一些错误输入的判断
      this.filterNumber(value);
    },

    // 下载模板（第一级）-----------------------------------------------
    modelFileClick() {
      window.open(this.$http + "/profile/download/importTemplateMatch.xlsx");
    },

    // 上传excel文件
    excelClick(val) {
      // if用于判断是否渲染头部模块
      this.topXrIs = val;
      this.excelDialogIs = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择一个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(response, file, fileList) {
      console.log(file);
      console.log(response);
      if (response.code != 200) {
        this.$message.error(response.msg);
        return;
      } else {
        this.$message.success("上传文件成功！");
      }

      // 一级数据渲染
      if (this.uploadNum == "1") {
        this.imgFile = response.data;
        this.xrFunc(this.imgFile);

        // 二级数据渲染
      } else if (this.uploadNum == "2") {
        console.log("第二层", response.data);

        for(var i = 0; i < response.data.length; i++){
          for (var objItem in response.data[i]) {
            if (objItem == "1") {
              this.templatelist[i].fillValue = response.data[i][objItem];
            } else if (objItem == "3") {
              this.templatelist[i].fillValue = response.data[i][objItem].split("|");
            }else if(objItem == '4'){
              if(response.data[i][objItem] == 'N'){
                this.templatelist[i].fillValue = false;
              }else{
                this.templatelist[i].fillValue = true;
              }
            }
          }
        }

        // 三级数据渲染
      } else if (this.uploadNum == "3") {
        console.log("第三层", response.data);

        for(var i = 0; i < response.data.length; i++){
          for (var objItem in response.data[i]) {
            if (objItem == "1") {
              this.templatelist2[i].fillValue = response.data[i][objItem];
            } else if (objItem == "3") {
              this.templatelist2[i].fillValue = response.data[i][objItem].split("|");
            }else if(objItem == '4'){
              if(response.data[i][objItem] == 'N'){
                this.templatelist2[i].fillValue = false;
              }else{
                this.templatelist2[i].fillValue = true;
              }
            }
          }
        }
      }

      this.$refs.myUpload.clearFiles();
      this.excelDialogIs = false;
    },

    // 下载模板（第二级）-------------------------------------------
    modelFileClickTwo() {
      importExcelTwo({ template: this.templatelist }).then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("上传信息失败！");
          return;
        }

        window.open(this.$http + "/profile/download/" + res.msg);
      });
    },

    // 上传
    excelClickTwo(num) {
      this.uploadNum = num;
      this.uploadApi = "/match/intoExcelTwo";
      this.excelDialogIs = true;
    },

    // 下载模板（第三级）-------------------------------------------
    modelFileClickTherr() {
      importExcelTwo({ template: this.templatelist2 }).then((res) => {
        console.log(res);
        if (res.code != "200") {
          this.$message.error("上传信息失败！");
          return;
        }

        window.open(this.$http + "/profile/download/" + res.msg);
      });
    },

    // 上传
    excelClickTherr(num) {
      this.uploadNum = num;
      this.uploadApi = "/match/intoExcelTwo";
      this.excelDialogIs = true;
    },
  },
  watch: {
    // 监听级联选择器
    "formData.industry"(newVal, oldVal) {
      console.log(newVal, oldVal);
      const catelist = newVal;
      const newarr = [];
      console.log(catelist);
      for (var i = 0; i < catelist.length; i++) {
        // console.log(catelist[i].length);
        if (catelist[i].length === 2) {
          newarr.push(catelist[i][1]);
        } else {
          newarr.push(catelist[i][1]);
        }
      }

      this.hylength = newarr.length;
      console.log(this.hylength);
      // if (newarr.length > 6) {
      //   // this.categoryList
      //   return this.$message.error("最多选择5个子项");
      // }
    },
  },
  components: {
    mathching2,
  },
};
</script>

<style lang="less" scoped>
.topmatch {
  margin-top: 10px;
}
.el-row--flex {
  margin-top: 10px;
  display: flex;
}
.formmainone {
  // border: 1px solid #ccc;
  box-shadow: 0px 7px 17px -6px #ccc;
  padding: 20px;
  margin-top: 73px;
  padding-top: 30px;
  position: relative;
}
.matchTitleone {
  margin-left: 30px;
  padding-bottom: 50px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  color: #0453fa;
  i {
    display: block;
    float: left;
    width: 19px;
    height: 19px;
    margin-top: -10px;
    border-radius: 50%;
    margin-right: 6px;
    background-color: #0453fa;
  }
  span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
  }
}
// /deep/.el-form-item__label {
//     // line-height: 40px;
//     padding: 0 28px 0 0;
//     box-sizing: border-box;
//     /* width: 100px; */
//     display: block;
//     width: 150px!important;
//     float: left;
// }

/deep/.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "" !important;
}
.honor {
  padding: 16px;
  margin-top: 30px;
  // border: 1px solid #ccc;
  box-shadow: 2px 5px 24px -4px #ccc;
  // overflow: hidden;
}
.towtitle {
  height: 30px;
  position: relative;
  margin-left: 86px;
  margin-top: -20px;
  margin-bottom: 20px;
  padding-bottom: 51px;
  // background-color: #ECF2FB !important;
  line-height: 48px;
  // width: 95.5%;
  z-index: 10;
  width: 100%;
  b {
    // overflow: hidden;
    z-index: 10;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #256bff;
  }
  span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #666666;
  }
  i {
    position: absolute;
    top: 0px;
    left: -106px;
    display: block;
    width: 7px;
    height: 51px;
    background-color: #417eff;
  }
  p {
    position: absolute;
    position: absolute;
    top: 0px;
    left: -99px;
    display: block;
    width: 107px;
    height: 51px;
    background-color: #ecf2fb;
    z-index: -20;
    width: 102%;
  }
}
.sontitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  // line-height: 19px;
  color: #333333;
}
.titleleft {
  margin-left: -10px;
}
// .el-checkbox-group{
//   // display: flex;
//   // justify-content: space-between;
// }
.tabletitle {
  margin-left: 90px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  padding-bottom: 30px;
}
.tabzz {
  border-color: #ececec;
  border: 0;
  text-align: center;
  height: 300px;
  border-collapse: collapse;
  tr {
    td {
      height: 40px;
      border-color: #ececec;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      // line-height: 19px;
      color: #256bff;
      &:first-child {
        width: 100px;
      }
      /deep/.el-input__inner {
        border: 0;
        text-align: center;
      }
    }
  }
}
.incountry,
.outcountry {
  color: #409eff;
  background-color: #fff !important;
  margin-left: 80px;
  &:hover {
    color: #fff;
    background-color: #409eff !important;
  }
}
.formcontry {
  margin-left: 90px;
  padding-top: 70px;
  .el-form-item {
    padding-right: 70px;
  }
}
.matchtitle {
  // width: 5%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: keep-all;
  margin-left: -61px;
}
.elform {
  margin-left: 95px;
  width: 30%;
  float: left;
}
.btns {
  height: 100px;
  // width: 100%;
  margin: 0 auto;
  margin-left: 45%;
}
.clear {
  clear: both;
}

.returnUp {
  width: 120px;
  height: 30px;
  font-size: 15px;
  font-weight: 600;
  line-height: 30px;
  cursor: pointer;
}
.stylubtn {
  background-color: #409eff !important;
  color: #fff;
}
.styleblank {
  color: #409eff;
  // color: #606295;
  background-color: #fff !important;
}

// 上传excel文件按钮
.excelBtn {
  width: 100px;
  height: 40px;
  background-color: #59c1fd;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  font-weight: 600;
  position: absolute;
  right: 80px;
  top: 10px;
  cursor: pointer;
}
.modelBtn {
  width: 100px;
  height: 40px;
  background-color: #fdb059;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  font-weight: 600;
  position: absolute;
  right: 200px;
  top: 10px;
  cursor: pointer;
}

.addFH {
  width: 100px;
  height: 100px;
  border: 2px solid black;
  position: relative;
  &::after {
    content: "+";
    font-size: 50px;
    position: absolute;
    left: 30px;
    top: 40px;
  }
}
</style>
<style>
.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "" !important;
}
</style>
