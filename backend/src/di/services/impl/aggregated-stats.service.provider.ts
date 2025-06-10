import { Provider } from '@nestjs/common';
import {
  AGGREGATED_STATS_SERVICE,
  AggregatedStatsService,
  AggregatedStatsServiceImpl,
} from '../../../core/application/services';

export const aggregatedStatsServiceProvider: Provider<AggregatedStatsService> = {
  provide: AGGREGATED_STATS_SERVICE,
  useClass: AggregatedStatsServiceImpl,
};
