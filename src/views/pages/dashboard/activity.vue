<script>
/**
 * Activity component
 */
export default {};
</script>

<template>
<div class="col-xl-4">
    <div class="card">
        <div class="card-body">
            <div class="float-end">
                <b-dropdown right toggle-class="p-0" variant="white" menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <span class="text-muted">
                            Recent
                            <i class="mdi mdi-chevron-down ms-1"></i>
                        </span>
                    </template>
                    <b-dropdown-item href="#">Recent</b-dropdown-item>
                    <b-dropdown-item href="#">By Users</b-dropdown-item>
                </b-dropdown>
            </div>

            <h4 class="card-title mb-4">Recent Activity</h4>

            <ol class="activity-feed mb-0 ps-2" data-simplebar style="max-height: 336px;">
                <li class="feed-item">
                    <div class="feed-item-list">
                        <p class="text-muted mb-1 font-size-13">
                            Today
                            <small class="d-inline-block ms-1">12:20 pm</small>
                        </p>
                        <p class="mt-0 mb-0">
                            Andrei Coman magna sed porta finibus, risus
                            posted a new article:
                            <span class="text-primary">
                                Forget UX
                                Rowland
                            </span>
                        </p>
                    </div>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        22 Jul, 2020
                        <small class="d-inline-block ms-1">12:36 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Andrei Coman posted a new article:
                        <span class="text-primary">Designer Alex</span>
                    </p>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        18 Jul, 2020
                        <small class="d-inline-block ms-1">07:56 am</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, sed porta finibus, risus Chris Wallace
                        Commented
                        <span class="text-primary">Developer Moreno</span>
                    </p>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        10 Jul, 2020
                        <small class="d-inline-block ms-1">08:42 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, Chris combined Commented
                        <span class="text-primary">UX Murphy</span>
                    </p>
                </li>

                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        23 Jun, 2020
                        <small class="d-inline-block ms-1">12:22 am</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, sed porta finibus, risus Chris Wallace
                        Commented
                        <span class="text-primary">Developer Moreno</span>
                    </p>
                </li>
                <li class="feed-item pb-1">
                    <p class="text-muted mb-1 font-size-13">
                        20 Jun, 2020
                        <small class="d-inline-block ms-1">09:48 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, Chris combined Commented
                        <span class="text-primary">UX Murphy</span>
                    </p>
                </li>
            </ol>
        </div>
    </div>
</div>
</template>
